import produce from 'immer';
import { ValueType, Target, Value } from '../z/target';
import { Lens } from './interface';

type NumberSubFocusGenerator = () => Generator<number, void, unknown>;
type StringSubFocusGenerator = () => Generator<string, void, unknown>;

type SubFocusGenerator<VT extends ValueType> = VT extends ValueType.Simple
  ? undefined
  : VT extends ValueType.Array
  ? NumberSubFocusGenerator
  : StringSubFocusGenerator;

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
  SF extends SubFocusGenerator<VT>
>(
  focus: F,
  valueType: VT,
  subFocus: SF
) => Lens<F, SF, VT, V, Value<VT, V>, Target<F, VT, V>>;

export function lens<V>(): LensCreatorOne<V> &
  LensCreatorTwo<V> &
  LensCreatorThree<V>;

export function lens<V>(): any {
  return <
    F extends string,
    VT extends ValueType,
    SF extends SubFocusGenerator<VT>
  >(
    focus: F,
    valueType: any = ValueType.Simple,
    subFocus: SF = undefined
  ): any => ({
    focus,
    valueType,
    subFocus,
    view: <S extends Target<F, VT, V>>(s: S): Value<VT, V> => {
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

          const it = ((subFocus as unknown) as NumberSubFocusGenerator)();

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

          const it = subFocus();

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

          const it = ((subFocus as unknown) as NumberSubFocusGenerator)();

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

          const it = ((subFocus as unknown) as StringSubFocusGenerator)();

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
    set: <S extends Target<F, VT, V>>(
      s: S,
      v: Value<VT, V>,
      transient = false
    ): S => {
      if (s === undefined) return s;

      switch (valueType) {
        case ValueType.Simple: {
          if (transient) {
            const tempS = s;
            (tempS as any)[focus] = v;
            return tempS;
          }
          return { ...s, [focus]: v };
        }
        case ValueType.Array: {
          if (subFocus === undefined) {
            if (transient) {
              const tempS = s;
              (tempS as any)[focus] = v;
              return tempS;
            }
            return { ...s, [focus]: v };
          }

          const it = ((subFocus as unknown) as NumberSubFocusGenerator)();

          let arr = s[focus];

          if (transient) {
            let key = it.next();

            while (!key.done) {
              arr[key.value as number] = v[key.value as number];
              key = it.next();
            }
            return s;
          }

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
            if (transient) {
              const tempS = s;
              (tempS as any)[focus] = v;
              return tempS;
            }
            return { ...s, [focus]: v };
          }

          const it = ((subFocus as unknown) as StringSubFocusGenerator)();

          let obj = s[focus];

          if (transient) {
            let key = it.next();

            while (!key.done) {
              obj[key.value as string] = v[key.value as string];
              key = it.next();
            }
            return s;
          }

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
    setOver: <S extends Target<F, VT, V>>(
      s: S,
      f: (v: V) => V,
      transient = false
    ): S => {
      if (s === undefined) return s;

      switch (valueType) {
        case ValueType.Simple: {
          if (transient) {
            const tempS = s;
            (tempS[focus] as any) = f((s as any)[focus]);
            return tempS;
          }

          return {
            ...s,
            [focus]: f(s[focus as string])
          };
        }
        case ValueType.Array: {
          const arr = (s[focus] as unknown) as V[];
          if (subFocus === undefined) {
            if (transient) {
              const tempS = s;
              tempS[focus as string] = arr.map(el => f(el));
              return tempS;
            }
            return {
              ...s,
              [focus]: arr.map(el => f(el as V))
            };
          }

          const it = ((subFocus as unknown) as NumberSubFocusGenerator)();

          if (transient) {
            let key = it.next();

            while (!key.done) {
              arr[key.value as number] = f(arr[key.value as number]);
              key = it.next();
            }
            return s;
          }

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
            if (transient) {
              const tempS = s;
              tempS[focus as string] = Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, f(value)])
              );
              return tempS;
            }

            return {
              ...s,
              [focus]: Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, f(value)])
              )
            };
          }

          const it = ((subFocus as unknown) as StringSubFocusGenerator)();

          if (transient) {
            let key = it.next();

            while (!key.done) {
              obj[key.value as string] = f(obj[key.value as string]);
              key = it.next();
            }
            return s;
          }

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
    }
  });
}
