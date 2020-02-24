import produce from 'immer';
import { ValueType, Target, Value } from '../z/target';

type NumberSubFocusGeneratorNoParams = () => Generator<number, void, unknown>;
type NumberSubFocusGeneratorWithParams<P> = (
  param: P
) => Generator<number, void, unknown>;

type StringSubFocusGeneratorNoParams = () => Generator<string, void, unknown>;
type StringSubFocusGeneratorWithParams<P> = (
  param: P
) => Generator<string, void, unknown>;

type NumberSubFocusGenerator<P> = P extends undefined | unknown
  ? NumberSubFocusGeneratorNoParams
  : NumberSubFocusGeneratorWithParams<P>;
type StringSubFocusGenerator<P> = P extends undefined | unknown
  ? StringSubFocusGeneratorNoParams
  : StringSubFocusGeneratorWithParams<P>;

type SubFocusGenerator<VT extends ValueType, P> = VT extends ValueType.Simple
  ? undefined
  : VT extends ValueType.Array
  ? NumberSubFocusGenerator<P>
  : StringSubFocusGenerator<P>;

type ViewFunc<V, R, P> = P extends undefined | unknown
  ? <S extends R>(s: S) => V
  : <S extends R>(s: S, param: P) => V;

export interface View<V, R, P> {
  view: ViewFunc<V, R, P>;
}

export interface ViewOver<V, R> {
  viewOver: <S extends R>(s: S, f: (v: V) => void) => void;
}

export interface Set<V, R> {
  set: <S extends R>(s: S, v: V) => S;
  setTransient: <S extends R>(s: S, v: V) => S;
}

export interface SetOver<V, R> {
  setOver: <S extends R>(s: S, f: (v: V) => V) => S;
  setOverTransient: <S extends R>(s: S, f: (v: V) => V) => S;
}

export interface Lens<F, P, VT extends ValueType, V, CV, R>
  extends View<CV, R, P>,
    ViewOver<V, R>,
    Set<CV, R>,
    SetOver<V, R> {
  focus: F;
  valueType: VT;
  subFocus?: SubFocusGenerator<VT, P>;
}

type LensCreatorOne<V> = <F extends string>(
  focus: F
) => Lens<
  F,
  undefined,
  ValueType.Simple,
  V,
  Value<ValueType.Simple, V>,
  Target<F, ValueType.Simple, V>
>;

type LensCreatorTwo<V> = <
  F extends string,
  VT extends ValueType.Array | ValueType.AssociativeArray
>(
  focus: F,
  valueType: VT
) => Lens<F, undefined, VT, V, Value<VT, V>, Target<F, VT, V>>;

type LensCreatorThree<V> = <
  F extends string,
  VT extends ValueType.Array | ValueType.AssociativeArray,
  P
>(
  focus: F,
  valueType: VT,
  subFocus: SubFocusGenerator<VT, P>
) => Lens<F, P, VT, V, Value<VT, V>, Target<F, VT, V>>;

export function lens<V>(): LensCreatorOne<V> &
  LensCreatorTwo<V> &
  LensCreatorThree<V>;

export function lens<V>(): any {
  return <F extends string, VT extends ValueType, P>(
    focus: F,
    valueType: any = ValueType.Simple,
    subFocus: SubFocusGenerator<VT, P> = undefined
  ): any => ({
    focus,
    valueType,
    subFocus,
    view: <S extends Target<F, VT, V>>(s: S, param?: P): Value<VT, V> => {
      switch (valueType) {
        case ValueType.Simple:
        case undefined: {
          const result: unknown = s[focus];

          return s ? (result as Value<VT, V>) : undefined;
        }
        case ValueType.Array: {
          if (s === undefined) return undefined;

          const arr = s[focus];

          if (subFocus === undefined) return (arr as unknown) as Value<VT, V>;

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as NumberSubFocusGeneratorWithParams<
              P
            >)(param);

          const result = [];

          let key = it.next();

          while (!key.done) {
            result[key.value as number] = arr[key.value as number];
            key = it.next();
          }

          return result as Value<VT, V>;
        }
        case ValueType.AssociativeArray: {
          if (s === undefined) return undefined;

          if (subFocus === undefined) return s[focus as string];

          const obj = s[focus];

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as StringSubFocusGeneratorWithParams<
              P
            >)(param);

          const result = {};

          let key = it.next();

          while (!key.done) {
            result[key.value as string] = obj[key.value as string];
            key = it.next();
          }

          return result as Value<VT, V>;
        }
        default:
          return undefined;
      }
    },
    viewOver: <S extends Target<F, VT, V>>(s: S, f: (v: V) => void): void => {
      switch (valueType) {
        case ValueType.Simple: {
          f(s[focus] as V);
          break;
        }
        case ValueType.Array: {
          const arr = s[focus] as V[];

          if (subFocus === undefined) {
            arr.map(el => f(el));
            break;
          }

          const it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();

          let key = it.next();
          while (!key.done) {
            f(arr[key.value as number]);
            key = it.next();
          }

          break;
        }
        case ValueType.AssociativeArray: {
          const obj = s[focus];

          if (subFocus === undefined) {
            Object.values(obj).forEach(value => {
              f(value);
            });
            break;
          }

          const it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();

          let key = it.next();
          while (!key.done) {
            f(obj[key.value as string]);
            key = it.next();
          }
          break;
        }
        default:
          break;
      }
    },
    set: <S extends Target<F, VT, V>>(s: S, v: Value<VT, V>): S => {
      if (s === undefined) return s;

      switch (valueType) {
        case ValueType.Simple: {
          return { ...s, [focus]: v };
        }
        case ValueType.Array: {
          if (subFocus === undefined) {
            return { ...s, [focus]: v };
          }

          const it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();

          let arr = s[focus];

          arr = produce(arr, arrDraft => {
            const arrDraftC = arrDraft;
            let key = it.next();

            while (!key.done) {
              arrDraftC[key.value as number] = v[key.value as number];
              key = it.next();
            }
          });
          return { ...s, [focus]: arr };
        }
        case ValueType.AssociativeArray: {
          if (subFocus === undefined) {
            return { ...s, [focus]: v };
          }

          const it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();

          let obj = s[focus];

          obj = produce(obj, objDraft => {
            const objDraftC = objDraft;
            let key = it.next();

            while (!key.done) {
              objDraftC[key.value as string] = v[key.value as string];
              key = it.next();
            }
          });
          return { ...s, [focus]: obj };
        }
        default:
          return undefined;
      }
    },
    setTransient: <S extends Target<F, VT, V>>(s: S, v: Value<VT, V>): S => {
      if (s === undefined) return s;

      switch (valueType) {
        case ValueType.Simple: {
          const tempS = s;
          (tempS as any)[focus] = v;
          return tempS;
        }
        case ValueType.Array: {
          if (subFocus === undefined) {
            const tempS = s;
            (tempS as any)[focus] = v;
            return tempS;
          }

          const it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();

          const arr = s[focus];

          let key = it.next();

          while (!key.done) {
            arr[key.value as number] = v[key.value as number];
            key = it.next();
          }
          return s;
        }
        case ValueType.AssociativeArray: {
          if (subFocus === undefined) {
            const tempS = s;
            (tempS as any)[focus] = v;
            return tempS;
          }

          const it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();

          const obj = s[focus];

          let key = it.next();

          while (!key.done) {
            obj[key.value as string] = v[key.value as string];
            key = it.next();
          }
          return s;
        }
        default:
          return undefined;
      }
    },
    setOver: <S extends Target<F, VT, V>>(s: S, f: (v: V) => V): S => {
      if (s === undefined) return s;

      switch (valueType) {
        case ValueType.Simple: {
          return {
            ...s,
            [focus]: f(s[focus as string])
          };
        }
        case ValueType.Array: {
          const arr = (s[focus] as unknown) as V[];
          if (subFocus === undefined) {
            return {
              ...s,
              [focus]: arr.map(el => f(el as V))
            };
          }

          const it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();

          return {
            ...s,
            [focus]: produce(arr, arrDraft => {
              let key = it.next();
              const tempArrDraft = arrDraft;

              while (!key.done) {
                (tempArrDraft as any)[key.value as number] = f(
                  arrDraft[key.value as number] as V
                );
                key = it.next();
              }
            })
          };
        }
        case ValueType.AssociativeArray: {
          let obj = s[focus];
          if (subFocus === undefined) {
            return {
              ...s,
              [focus]: Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, f(value)])
              )
            };
          }

          const it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();

          obj = produce(obj, objDraft => {
            const objDraftC = objDraft;
            let key = it.next();

            while (!key.done) {
              objDraftC[key.value as string] = f(obj[key.value as string]);
              key = it.next();
            }
          });
          return { ...s, [focus]: obj };
        }
        default:
          return undefined;
      }
    },
    setOverTransient: <S extends Target<F, VT, V>>(s: S, f: (v: V) => V): S => {
      if (s === undefined) return s;

      switch (valueType) {
        case ValueType.Simple: {
          const tempS = s;
          (tempS[focus] as any) = f((s as any)[focus]);
          return tempS;
        }
        case ValueType.Array: {
          const arr = (s[focus] as unknown) as V[];
          if (subFocus === undefined) {
            const tempS = s;
            tempS[focus as string] = arr.map(el => f(el));
            return tempS;
          }

          const it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();

          let key = it.next();

          while (!key.done) {
            arr[key.value as number] = f(arr[key.value as number]);
            key = it.next();
          }
          return s;
        }
        case ValueType.AssociativeArray: {
          const obj = s[focus];
          if (subFocus === undefined) {
            const tempS = s;
            tempS[focus as string] = Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [key, f(value)])
            );
            return tempS;
          }

          const it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();

          let key = it.next();

          while (!key.done) {
            obj[key.value as string] = f(obj[key.value as string]);
            key = it.next();
          }
          return s;
        }
        default:
          return undefined;
      }
    }
  });
}
