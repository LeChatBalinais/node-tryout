import ILens from './ilens';
import { ValueType, Target, TeleValue } from './target';

export default class Telescope<
  F,
  VT extends ValueType,
  VLU,
  IVLU,
  R
> extends ILens<F, VT, VLU, IVLU, R> {
  valueType: VT;

  focus: F;

  viewFunc: <S extends R>(s: S) => VLU;

  viewOverFunc: <S extends R>(s: S, f: (v: IVLU) => void) => void;

  setFunc: <S extends R>(s: S, v: VLU) => S;

  setOverFunc: <S extends R>(s: S, f: (v: IVLU) => IVLU) => S;

  constructor(
    focus: F,
    valueType: VT,
    viewFunc: <S extends R>(s: S) => VLU,
    viewOverFunc: <S extends R>(s: S, f: (v: IVLU) => void) => void,
    setFunc: <S extends R>(s: S, v: VLU) => S,
    setOverFunc: <S extends R>(s: S, f: (v: IVLU) => IVLU) => S
  ) {
    super();
    this.valueType = valueType;
    this.viewFunc = viewFunc;
    this.viewOverFunc = viewOverFunc;
    this.setFunc = setFunc;
    this.setOverFunc = setOverFunc;
  }

  view<S extends R>(s: S): VLU {
    return this.viewFunc(s);
  }

  viewOver<S extends R>(s: S, f: (v: IVLU) => void): void {
    this.viewOverFunc(s, f);
  }

  set<S extends R>(s: S, v: VLU): S {
    return this.setFunc(s, v);
  }

  setOver<S extends R>(s: S, f: (v: IVLU) => IVLU): S {
    return this.setOverFunc(s, f);
  }

  getValueType(): VT {
    return this.valueType;
  }

  getFocus(): F {
    return this.focus;
  }
}

export function telescope<
  F1 extends string,
  VT1 extends ValueType,
  V1,
  IV1,
  R1,
  F2 extends string,
  VT2 extends ValueType,
  V2,
  IV2 extends Target<F1, VT1, IV1>,
  R2
>(
  l1: ILens<F2, VT2, V2, IV2, R2>,
  l2: ILens<F1, VT1, V1, IV1, R1>
): ILens<F2, VT2, TeleValue<TeleValue<IV1, VT1>, VT2>, IV1, R2>;

export function telescope<
  F1 extends string,
  VT1 extends ValueType,
  V1,
  IV1,
  R1,
  F2 extends string,
  VT2 extends ValueType,
  V2,
  IV2 extends Target<F1, VT1, IV1>,
  R2,
  F3 extends string,
  VT3 extends ValueType,
  V3,
  IV3 extends Target<F2, VT2, IV2>,
  R3
>(
  l1: ILens<F3, VT3, V3, IV3, R3>,
  l2: ILens<F2, VT2, V2, IV2, R2>,
  l3: ILens<F1, VT1, V1, IV1, R1>
): ILens<F3, VT3, TeleValue<TeleValue<TeleValue<IV1, VT1>, VT2>, VT3>, IV1, R3>;

export function telescope(...args): any {
  const applyViewOnLens = (t, lens): any => lens.view(t);

  const viewFunc = (s): any => {
    let applyLens = applyViewOnLens;

    return args.reduce((target, lens) => {
      const result = applyLens(target, lens);

      switch (lens.getValueType()) {
        case ValueType.Array:
          applyLens = (appLns => (trgt, lns): any => {
            return trgt.map(value => appLns(value, lns));
          })(applyLens);
          break;
        case ValueType.AssociativeArray:
          applyLens = (appLns => (trgt, lns): any =>
            Object.fromEntries(
              Object.entries(trgt).map(([key, value]) => [
                key,
                appLns(value, lns)
              ])
            ))(applyLens);
          break;
        default:
          break;
      }

      return result;
    }, s);
  };

  const viewOverFunc = (s, f): any => {
    const viewOver = args.reduceRight((currentViewOver, lens): any => {
      return (trgt): any => lens.viewOver(trgt, currentViewOver);
    }, f);

    viewOver(s);
  };

  const setFunc = (s, v): any => {
    return s;
  };

  const setOverFunc = (s, f): any => {
    return s;
  };

  return new Telescope<string, ValueType, any, any, any>(
    args[0].getFocus(),
    args[0].getValueType(),
    viewFunc,
    viewOverFunc,
    setFunc,
    setOverFunc
  );
}
