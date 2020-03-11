import produce from 'immer';
import { Lens } from './lens';
import {
  TelescopedValue,
  Target,
  ValueType,
  ValueTypeArray,
  Focus
} from '../z/target';

function getVw(vtarr): any {
  const vws = vtarr.map(vt => {
    if (Array.isArray(vt)) {
      return getVw(vt);
    }
    switch (vt) {
      case ValueType.Simple:
      default:
        return v => v;
      case ValueType.Array:
        return v => (trgt, lns, param): any => {
          return trgt.map(value => v(value, lns, param));
        };
      case ValueType.AssociativeArray:
        return v => (trgt, lns, param): any => {
          return Object.fromEntries(
            Object.entries(trgt).map(([key, value]) => [
              key,
              v(value, lns, param)
            ])
          );
        };
    }
  });

  return v => (trgt, lns, param): any => {
    return trgt.map((value, i) => vws[i](v)(value, lns, param));
  };
}

function getSt(vtarr): any {
  const vws = vtarr.map((vt, k) => {
    if (Array.isArray(vt)) {
      return getSt(vt);
    }
    switch (vt) {
      case ValueType.Simple:
      default:
        return appLns => appLns;
      case ValueType.Array:
        return appLns => (trgt, lns, val, param): void => {
          trgt.forEach((value, j) => appLns(value, lns, val[k], param));
        };

      case ValueType.AssociativeArray:
        return appLns => (trgt, lns, val, param): void => {
          Object.entries(trgt).forEach(([key, value]) => {
            appLns(value, lns, val[k], param);
          });
        };
    }
  });

  return v => (trgt, lns, param): any => {
    return trgt.map((value, i) => vws[i](v)(value, lns, param));
  };
}

export type TelescopedParam<P1, P2> = P1 extends undefined
  ? P2
  : P2 extends undefined
  ? P1
  : P1 & P2;

export function telescope<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  P1,
  F2 extends Focus,
  VT2 extends ValueTypeArray,
  V2 extends F2 extends Focus[] ? Target<F1, VT1, V1>[] : Target<F1, VT1, V1>,
  CV2,
  R2,
  P2
>(
  l1: Lens<F2, VT2, V2, CV2, R2, P2>,
  l2: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  F2,
  VT2,
  V1,
  TelescopedValue<TelescopedValue<V1, VT1>, VT2>,
  R2,
  TelescopedParam<P1, P2>
>;

export function telescope<
  F1 extends string,
  VT1 extends ValueType,
  V1,
  CV1,
  R1,
  P1,
  F2 extends string,
  VT2 extends ValueType,
  V2 extends Target<F1, VT1, V1>,
  CV2,
  R2,
  P2,
  F3 extends string,
  VT3 extends ValueType,
  V3 extends Target<F2, VT2, V2>,
  CV3,
  R3,
  P3
>(
  l1: Lens<F3, VT3, V3, CV3, R3, P3>,
  l2: Lens<F2, VT2, V2, CV2, R2, P2>,
  l3: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  F3,
  VT3,
  V1,
  TelescopedValue<TelescopedValue<TelescopedValue<V1, VT1>, VT2>, VT3>,
  R3,
  TelescopedParam<P1, TelescopedParam<P2, P3>>
>;

export function telescope<
  F1 extends string,
  VT1 extends ValueType,
  V1,
  CV1,
  R1,
  P1,
  F2 extends string,
  VT2 extends ValueType,
  V2 extends Target<F1, VT1, V1>,
  CV2,
  R2,
  P2,
  F3 extends string,
  VT3 extends ValueType,
  V3 extends Target<F2, VT2, V2>,
  CV3,
  R3,
  P3,
  F4 extends string,
  VT4 extends ValueType,
  V4 extends Target<F3, VT3, V3>,
  CV4,
  R4,
  P4
>(
  l1: Lens<F4, VT4, V4, CV4, R4, P4>,
  l2: Lens<F3, VT3, V3, CV3, R3, P3>,
  l3: Lens<F2, VT2, V2, CV2, R2, P2>,
  l4: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  F4,
  VT4,
  V1,
  TelescopedValue<
    TelescopedValue<TelescopedValue<TelescopedValue<V1, VT1>, VT2>, VT3>,
    VT4
  >,
  R4,
  TelescopedParam<TelescopedParam<P1, TelescopedParam<P2, P3>>, P4>
>;

export function telescope<
  F1 extends string,
  VT1 extends ValueType,
  V1,
  CV1,
  R1,
  P1,
  F2 extends string,
  VT2 extends ValueType,
  V2 extends Target<F1, VT1, V1>,
  CV2,
  R2,
  P2,
  F3 extends string,
  VT3 extends ValueType,
  V3 extends Target<F2, VT2, V2>,
  CV3,
  R3,
  P3,
  F4 extends string,
  VT4 extends ValueType,
  V4 extends Target<F3, VT3, V3>,
  CV4,
  R4,
  P4,
  F5 extends string,
  VT5 extends ValueType,
  V5 extends Target<F4, VT4, V4>,
  CV5,
  R5,
  P5
>(
  l1: Lens<F5, VT5, V5, CV5, R5, P5>,
  l2: Lens<F4, VT4, V4, CV4, R4, P4>,
  l3: Lens<F3, VT3, V3, CV3, R3, P3>,
  l4: Lens<F2, VT2, V2, CV2, R2, P2>,
  l5: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  F5,
  VT5,
  V1,
  TelescopedValue<
    TelescopedValue<
      TelescopedValue<TelescopedValue<TelescopedValue<V1, VT1>, VT2>, VT3>,
      VT4
    >,
    VT5
  >,
  R5,
  TelescopedParam<
    TelescopedParam<TelescopedParam<P1, TelescopedParam<P2, P3>>, P4>,
    P5
  >
>;

export function telescope(...args): any {
  const applyViewBase = (t, lens, param): any => {
    return lens.view(t, param);
  };

  const views = [];

  for (let i = args.length - 2; i >= 0; i -= 1) {
    let applyView = applyViewBase;

    for (let j = i; j >= 0; j -= 1) {
      if (Array.isArray(args[j].valueType)) {
        applyView = getVw(args[j].valueType)(applyView);
      } else {
        switch (args[j].valueType) {
          case ValueType.Array:
            applyView = (v => (trgt, lns, param): any => {
              return trgt.map(value => v(value, lns, param));
            })(applyView);
            break;
          case ValueType.AssociativeArray:
            applyView = (v => (trgt, lns, param): any => {
              return Object.fromEntries(
                Object.entries(trgt).map(([key, value]) => [
                  key,
                  v(value, lns, param)
                ])
              );
            })(applyView);
            break;
          default:
            break;
        }
      }
    }
    views.unshift(
      ((k, appV) => (t, param) => appV(t, args[k], param))(i + 1, applyView)
    );
  }
  views.unshift((t, param) => applyViewBase(t, args[0], param));

  const applySetBase = (t, lens, v, param): any => {
    return lens.setTransient(t, v, param);
  };

  let applySet = applySetBase;

  for (let i = args.length - 2; i >= 0; i -= 1) {
    if (Array.isArray(args[i].valueType)) {
      applySet = getSt(args[i].valueType)(applySet);
    } else {
      switch (args[i].valueType) {
        case ValueType.Array:
          applySet = (appLns => (trgt, lns, val, param): void => {
            trgt.forEach((value, j) => appLns(value, lns, val[j], param));
          })(applySet);
          break;
        case ValueType.AssociativeArray:
          applySet = (appLns => (trgt, lns, val, param): void => {
            Object.entries(trgt).forEach(([key, value]) => {
              appLns(value, lns, val[key], param);
            });
          })(applySet);
          break;
        default:
          break;
      }
    }
  }

  return {
    focus: args[0].focus,
    valueType: args[0].valueType,
    subFocus: undefined,
    view: (s: any, param?: any): any => {
      return views.reduce((target, v) => {
        return v(target, param);
      }, s);
    },
    viewOver: (s, f, param?: any): any => {
      const viewOver = args.reduceRight((currentViewOver, lens): any => {
        if (Array.isArray(lens.valueType)) {
          return (trgt): any =>
            lens.viewOver(
              trgt,
              lens.valueType.map(l => currentViewOver),
              param
            );
        }

        return (trgt): any => lens.viewOver(trgt, currentViewOver, param);
      }, f);

      viewOver(s);
    },
    set: (s, v, param?): any => {
      return produce(s, draftS => {
        let focusedTrgt = draftS;

        for (let i = 0; i < args.length - 1; i += 1) {
          focusedTrgt = views[i](focusedTrgt, param);
        }
        applySet(focusedTrgt, args[args.length - 1], v, param);
      });
    },
    setTransient: (s, v, param?): any => {
      let focusedTrgt = s;

      for (let i = 0; i < args.length - 1; i += 1) {
        focusedTrgt = views[i](focusedTrgt, param);
      }
      applySet(focusedTrgt, args[args.length - 1], v, param);

      return s;
    },
    setOver: (s, f, param?): any => {
      const setOver = args.reduceRight((currentSetOver, lens): any => {
        if (Array.isArray(lens.valueType)) {
          return (trgt): any =>
            lens.setOverTransient(
              trgt,
              lens.valueType.map(l => currentSetOver),
              param
            );
        }

        return (trgt): any =>
          lens.setOverTransient(trgt, currentSetOver, param);
      }, f);

      return produce(s, draftS => setOver(draftS));
    },
    setOverTransient: (s, f, param?): any => {
      const setOver = args.reduceRight((currentSetOver, lens): any => {
        if (Array.isArray(lens.valueType)) {
          return (trgt): any =>
            lens.setOverTransient(
              trgt,
              lens.valueType.map(l => currentSetOver),
              param
            );
        }

        return (trgt): any =>
          lens.setOverTransient(trgt, currentSetOver, param);
      }, f);

      setOver(s);

      return s;
    }
  };
}
