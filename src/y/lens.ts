import produce from 'immer';
import { Focus, ValueTypeArray, ValueType, Target, Value } from '../z/target';

export type NumberSubFocusGeneratorNoParams = () => Generator<
  number,
  void,
  unknown
>;
export type NumberSubFocusGeneratorWithParams<P> = (
  param: P
) => Generator<number, void, unknown>;

export type StringSubFocusGeneratorNoParams = () => Generator<
  string,
  void,
  unknown
>;
export type StringSubFocusGeneratorWithParams<P> = (
  param: P
) => Generator<string, void, unknown>;

export type NumberSubFocusGenerator<P> = P extends undefined
  ? NumberSubFocusGeneratorNoParams
  : NumberSubFocusGeneratorWithParams<P>;
export type StringSubFocusGenerator<P> = P extends undefined
  ? StringSubFocusGeneratorNoParams
  : StringSubFocusGeneratorWithParams<P>;

export type SubFocusGenerator<
  VT extends ValueTypeArray,
  P
> = VT extends ValueType.Simple
  ? undefined
  : VT extends ValueType.Array
  ? NumberSubFocusGenerator<P>
  : VT extends ValueType.AssociativeArray
  ? StringSubFocusGenerator<P>
  : never;

type ViewFunc<V, R, P> = P extends undefined
  ? <S extends R>(s: S) => V
  : <S extends R, PRM extends P>(s: S, param: PRM) => V;

export interface View<V, R, P> {
  view: ViewFunc<V, R, P>;
}

type ViewingFunction<V> = V extends any[]
  ? { [K in keyof V]: ViewingFunction<V[K]> }
  : (v: V) => void;

type ViewOverFunc<V, R, P> = P extends undefined
  ? <S extends R>(s: S, f: ViewingFunction<V>) => void
  : <S extends R, PRM extends P>(
      s: S,
      f: ViewingFunction<V>,
      param: PRM
    ) => void;

export interface ViewOver<V, R, P> {
  viewOver: ViewOverFunc<V, R, P>;
}

type SetFunc<V, R, P> = P extends undefined
  ? <S extends R>(s: S, v: V) => S
  : <S extends R, PRM extends P>(s: S, v: V, param: PRM) => S;

export interface Set<V, R, P> {
  set: SetFunc<V, R, P>;
  setTransient: SetFunc<V, R, P>;
}

type SettingFunction<V> = V extends any[]
  ? { [K in keyof V]: SettingFunction<V[K]> }
  : (v: V) => V;

type SetOverFunc<V, R, P> = P extends undefined
  ? <S extends R>(s: S, f: SettingFunction<V>) => S
  : <S extends R, PRM extends P>(s: S, f: SettingFunction<V>, param: PRM) => S;

export interface SetOver<V, R, P> {
  setOver: SetOverFunc<V, R, P>;
  setOverTransient: SetOverFunc<V, R, P>;
}

export interface Lens<
  F extends Focus,
  VT extends ValueTypeArray,
  V,
  CV,
  R,
  P = undefined
> extends View<CV, R, P>, ViewOver<V, R, P>, Set<CV, R, P>, SetOver<V, R, P> {
  focus: F;
  valueType: VT;
  subFocus?: SubFocusGenerator<VT, P>;
}

type LensCreatorOne<V> = <F extends string>(
  focus: F
) => Lens<
  F,
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
) => Lens<F, VT, V, Value<VT, V>, Target<F, VT, V>>;

type LensCreatorThree<V> = <
  F extends string,
  VT extends ValueType.Array | ValueType.AssociativeArray,
  P = undefined
>(
  focus: F,
  valueType: VT,
  subFocus: SubFocusGenerator<VT, P>
) => Lens<F, VT, V, Value<VT, V>, Target<F, VT, V>, P>;

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
    view: <S extends Target<F, VT, V>>(s: S, param?: P): any => {
      switch (valueType) {
        case ValueType.Simple: {
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

          if (subFocus === undefined) return s[(focus as any) as string];

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
    viewOver: <S extends Target<F, VT, V>>(
      s: S,
      f: (v: V) => void,
      param?: P
    ): void => {
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

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as NumberSubFocusGeneratorWithParams<
              P
            >)(param);

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

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as StringSubFocusGeneratorWithParams<
              P
            >)(param);

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
    set: <S extends Target<F, VT, V>>(s: S, v: Value<VT, V>, param?: P): S => {
      if (s === undefined) return s;

      switch (valueType) {
        case ValueType.Simple: {
          return { ...s, [focus]: v };
        }
        case ValueType.Array: {
          if (subFocus === undefined) {
            return { ...s, [focus]: v };
          }

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as NumberSubFocusGeneratorWithParams<
              P
            >)(param);

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

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as StringSubFocusGeneratorWithParams<
              P
            >)(param);

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
    setTransient: <S extends Target<F, VT, V>>(
      s: S,
      v: Value<VT, V>,
      param?: P
    ): S => {
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

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as NumberSubFocusGeneratorWithParams<
              P
            >)(param);

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

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as StringSubFocusGeneratorWithParams<
              P
            >)(param);

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
    setOver: <S extends Target<F, VT, V>>(
      s: S,
      f: (v: V) => V,
      param?: P
    ): S => {
      if (s === undefined) return s;

      switch (valueType) {
        case ValueType.Simple: {
          return {
            ...s,
            [focus]: f(s[focus as string] as V)
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

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as NumberSubFocusGeneratorWithParams<
              P
            >)(param);

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

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as StringSubFocusGeneratorWithParams<
              P
            >)(param);

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
    setOverTransient: (s: any, f: (v: V) => V, param?: P): any => {
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

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as NumberSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as NumberSubFocusGeneratorWithParams<
              P
            >)(param);

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
              Object.entries(obj).map(([key, value]) => [key, f(value as V)])
            );
            return tempS;
          }

          let it: any;

          if (param === undefined)
            it = ((subFocus as unknown) as StringSubFocusGeneratorNoParams)();
          else
            it = ((subFocus as unknown) as StringSubFocusGeneratorWithParams<
              P
            >)(param);

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
