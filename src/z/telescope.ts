import produce from 'immer';
import ILens from './ilens';
import { ValueType, Target, TelescopedValue } from './target';
import { view } from '../lens';

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
    setOverFunc: <S extends R>(s: S, f: (v: IVLU) => void) => S
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
): ILens<F2, VT2, TelescopedValue<TelescopedValue<IV1, VT1>, VT2>, IV1, R2>;

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
): ILens<
  F3,
  VT3,
  TelescopedValue<TelescopedValue<TelescopedValue<IV1, VT1>, VT2>, VT3>,
  IV1,
  R3
>;

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
  R3,
  F4 extends string,
  VT4 extends ValueType,
  V4,
  IV4 extends Target<F3, VT3, IV3>,
  R4
>(
  l1: ILens<F4, VT4, V4, IV4, R4>,
  l2: ILens<F3, VT3, V3, IV3, R3>,
  l3: ILens<F2, VT2, V2, IV2, R2>,
  l4: ILens<F1, VT1, V1, IV1, R1>
): ILens<
  F4,
  VT4,
  TelescopedValue<
    TelescopedValue<TelescopedValue<TelescopedValue<IV1, VT1>, VT2>, VT3>,
    VT4
  >,
  IV1,
  R4
>;

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
  R3,
  F4 extends string,
  VT4 extends ValueType,
  V4,
  IV4 extends Target<F3, VT3, IV3>,
  R4,
  F5 extends string,
  VT5 extends ValueType,
  V5,
  IV5 extends Target<F4, VT4, IV4>,
  R5
>(
  l1: ILens<F5, VT5, V5, IV5, R5>,
  l2: ILens<F4, VT4, V4, IV4, R4>,
  l3: ILens<F3, VT3, V3, IV3, R3>,
  l4: ILens<F2, VT2, V2, IV2, R2>,
  l5: ILens<F1, VT1, V1, IV1, R1>
): ILens<
  F5,
  VT5,
  TelescopedValue<
    TelescopedValue<
      TelescopedValue<TelescopedValue<TelescopedValue<IV1, VT1>, VT2>, VT3>,
      VT4
    >,
    VT5
  >,
  IV1,
  R5
>;

export function telescope(...args): any {
  const applySetOnLensBase = (t, lens, v): void => {
    lens.set(t, v, true);
  };

  const applyViewBase = (t, lens): any => {
    return lens.view(t);
  };

  const views = [];

  for (let i = args.length - 2; i >= 0; i -= 1) {
    let applyView = applyViewBase;

    for (let j = i; j >= 0; j -= 1) {
      switch (args[j].getValueType()) {
        case ValueType.Array:
          applyView = (v => (trgt, lns): any => {
            return trgt.map(value => v(value, lns));
          })(applyView);
          break;
        case ValueType.AssociativeArray:
          applyView = (v => (trgt, lns): any => {
            return Object.fromEntries(
              Object.entries(trgt).map(([key, value]) => [key, v(value, lns)])
            );
          })(applyView);
          break;
        default:
          break;
      }
    }
    views.unshift(((k, appV) => t => appV(t, args[k]))(i + 1, applyView));
  }
  views.unshift(t => applyViewBase(t, args[0]));

  const viewFunc = (s): any => {
    return views.reduce((target, v) => {
      return v(target);
    }, s);
  };

  const viewOverFunc = (s, f): any => {
    const viewOver = args.reduceRight((currentViewOver, lens): any => {
      return (trgt): any => lens.viewOver(trgt, currentViewOver);
    }, f);

    viewOver(s);
  };

  const setFunc = (s, v): any => {
    const applySetOnLens = applySetOnLensBase;

    return produce(s, draftS => {
      const focusedTrgt = views.reduce((target, currentView, i) => {
        if (i === args.length - 1) return target;
        return currentView(target);
      }, draftS);
      args.reduceRight((aps, lens, i) => {
        if (i === args.length - 1) return aps;
        switch (lens.getValueType()) {
          case ValueType.Array:
            return (appLns => (trgt, lns, val): void => {
              trgt.forEach((value, j) => appLns(value, lns, val[j]));
            })(aps);
          case ValueType.AssociativeArray:
            return (appLns => (trgt, lns, val): void => {
              Object.entries(trgt).forEach(([key, value]) => {
                appLns(value, lns, val[key]);
              });

              trgt.foreach((value, j) => appLns(value, lns, v[j]));
            })(aps);
          default:
            return aps;
        }
      }, applySetOnLens)(focusedTrgt, args[args.length - 1], v);
    });
  };

  const setOverFunc = (s, f): any => {
    const setOver = args.reduceRight((currentSetOver, lens): any => {
      return (trgt): any => lens.setOver(trgt, currentSetOver, true);
    }, f);

    return produce(s, draftS => setOver(draftS));
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
