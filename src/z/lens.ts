import produce from 'immer';
import { ValueType, Target, Value } from './target';
import ILens from './ilens';

type NumberSubFocusGenerator = () => Generator<number, void, unknown>;
type StringSubFocusGenerator = () => Generator<string, void, unknown>;

type SubFocusGenerator<VT extends ValueType> = VT extends ValueType.Simple
  ? undefined
  : VT extends ValueType.Array
  ? NumberSubFocusGenerator
  : StringSubFocusGenerator;

export default class Lens<
  V,
  F extends string,
  VT extends ValueType,
  SF extends SubFocusGenerator<VT>
> extends ILens<F, VT, Value<VT, V>, V, Target<F, VT, V>> {
  focus: F;

  subFocus?: SF;

  valueType: VT;

  constructor(focus: F, subFocus: SF, valueType: VT) {
    super();
    this.focus = focus;
    this.subFocus = subFocus;
    this.valueType = valueType;
  }

  view<S extends Target<F, VT, V>>(s: S): Value<VT, V> {
    switch (this.valueType) {
      case ValueType.Simple: {
        const result: unknown = s[this.focus];

        return s ? (result as Value<VT, V>) : undefined;
      }
      case ValueType.Array: {
        if (s === undefined) return undefined;

        const arr = s[this.focus];

        if (this.subFocus === undefined)
          return (arr as unknown) as Value<VT, V>;

        const it = ((this.subFocus as unknown) as NumberSubFocusGenerator)();

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

        if (this.subFocus === undefined) return s[this.focus as string];

        const obj = s[this.focus];

        const it = this.subFocus();

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
  }

  viewOver<S extends Target<F, VT, V>>(s: S, f: (v: V) => void): void {
    switch (this.valueType) {
      case ValueType.Simple: {
        f(s[this.focus] as V);
        break;
      }
      case ValueType.Array: {
        const arr = s[this.focus] as V[];

        if (this.subFocus === undefined) {
          arr.map(el => f(el));
          break;
        }

        const it = ((this.subFocus as unknown) as NumberSubFocusGenerator)();

        let key = it.next();
        while (!key.done) {
          f(arr[key.value as number]);
          key = it.next();
        }

        break;
      }
      case ValueType.AssociativeArray: {
        const obj = s[this.focus];

        if (this.subFocus === undefined) {
          Object.values(obj).forEach(value => {
            f(value);
          });
          break;
        }

        const it = ((this.subFocus as unknown) as StringSubFocusGenerator)();

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
  }

  set<S extends Target<F, VT, V>>(s: S, v: Value<VT, V>, transient = false): S {
    if (s === undefined) return s;

    switch (this.valueType) {
      case ValueType.Simple: {
        if (transient) {
          const tempS = s;
          (tempS as any)[this.focus] = v;
          return tempS;
        }
        return { ...s, [this.focus]: v };
      }
      case ValueType.Array: {
        if (this.subFocus === undefined) {
          if (transient) {
            const tempS = s;
            (tempS as any)[this.focus] = v;
            return tempS;
          }
          return { ...s, [this.focus]: v };
        }

        const it = ((this.subFocus as unknown) as NumberSubFocusGenerator)();

        let arr = s[this.focus];

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
        return { ...s, [this.focus]: arr };
      }
      case ValueType.AssociativeArray: {
        if (this.subFocus === undefined) {
          if (transient) {
            const tempS = s;
            (tempS as any)[this.focus] = v;
            return tempS;
          }
          return { ...s, [this.focus]: v };
        }

        const it = ((this.subFocus as unknown) as StringSubFocusGenerator)();

        let obj = s[this.focus];

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
        return { ...s, [this.focus]: obj };
      }
      default:
        return undefined;
    }
  }

  setOver<S extends Target<F, VT, V>>(
    s: S,
    f: (v: V) => V,
    transient = false
  ): S {
    if (s === undefined) return s;

    switch (this.valueType) {
      case ValueType.Simple: {
        if (transient) {
          const tempS = s;
          (tempS[this.focus] as any) = f((s as any)[this.focus]);
          return tempS;
        }

        return {
          ...s,
          [this.focus]: f(s[this.focus as string])
        };
      }
      case ValueType.Array: {
        const arr = (s[this.focus] as unknown) as V[];
        if (this.subFocus === undefined) {
          if (transient) {
            const tempS = s;
            tempS[this.focus as string] = arr.map(el => f(el));
            return tempS;
          }
          return {
            ...s,
            [this.focus]: arr.map(el => f(el as V))
          };
        }

        const it = ((this.subFocus as unknown) as NumberSubFocusGenerator)();

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
          [this.focus]: produce(arr, arrDraft => {
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
        let obj = s[this.focus];
        if (this.subFocus === undefined) {
          if (transient) {
            const tempS = s;
            tempS[this.focus as string] = Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [key, f(value)])
            );
            return tempS;
          }

          return {
            ...s,
            [this.focus]: Object.fromEntries(
              Object.entries(obj).map(([key, value]) => [key, f(value)])
            )
          };
        }

        const it = ((this.subFocus as unknown) as StringSubFocusGenerator)();

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
        return { ...s, [this.focus]: obj };
      }
      default:
        return undefined;
    }
  }

  getValueType(): VT {
    return this.valueType;
  }

  getFocus(): F {
    return this.focus;
  }
}

export function lens<V>(): <
  F extends string,
  VT extends ValueType = ValueType.Simple,
  SF extends SubFocusGenerator<VT> = undefined
>(
  focus: F,
  valueType: VT,
  subFocus: SF
) => ILens<F, VT, Value<VT, V>, V, Target<F, VT, V>> {
  return <
    F extends string,
    VT extends ValueType = ValueType.Simple,
    SF extends SubFocusGenerator<VT> = undefined
  >(
    focus: F,
    valueType: VT,
    subFocus: SF
  ): ILens<F, VT, Value<VT, V>, V, Target<F, VT, V>> =>
    new Lens<V, F, VT, SF>(focus, subFocus, valueType);
}
