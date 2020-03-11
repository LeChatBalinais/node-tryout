import produce from 'immer';
import { Lens } from './lens';
import { TelescopedParam } from './telescope';
import { ValueTypeArray, Focus } from '../z/target';

export function array<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  P1,
  F2 extends Focus,
  VT2 extends ValueTypeArray,
  V2,
  CV2,
  R2,
  P2
>(
  l1: Lens<F2, VT2, V2, CV2, R2, P2>,
  l2: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  [F2, F1],
  [VT2, VT1],
  [V2, V1],
  [CV2, CV1],
  R2 & R1,
  TelescopedParam<P1, P2>
>;

export function array<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  P1,
  F2 extends Focus,
  VT2 extends ValueTypeArray,
  V2,
  CV2,
  R2,
  P2,
  F3 extends Focus,
  VT3 extends ValueTypeArray,
  V3,
  CV3,
  R3,
  P3
>(
  l1: Lens<F3, VT3, V3, CV3, R3, P3>,
  l2: Lens<F2, VT2, V2, CV2, R2, P2>,
  l3: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  [F3, F2, F1],
  [VT3, VT2, VT1],
  [V3, V2, V1],
  [CV3, CV2, CV1],
  R3 & R2 & R1,
  TelescopedParam<TelescopedParam<P1, P2>, P3>
>;

export function array<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  P1,
  F2 extends Focus,
  VT2 extends ValueTypeArray,
  V2,
  CV2,
  R2,
  P2,
  F3 extends Focus,
  VT3 extends ValueTypeArray,
  V3,
  CV3,
  R3,
  P3,
  F4 extends Focus,
  VT4 extends ValueTypeArray,
  V4,
  CV4,
  R4,
  P4
>(
  l1: Lens<F4, VT4, V4, CV4, R4, P4>,
  l2: Lens<F3, VT3, V3, CV3, R3, P3>,
  l3: Lens<F2, VT2, V2, CV2, R2, P2>,
  l4: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  [F4, F3, F2, F1],
  [VT4, VT3, VT2, VT1],
  [V4, V3, V2, V1],
  [CV4, CV3, CV2, CV1],
  R4 & R3 & R2 & R1,
  TelescopedParam<TelescopedParam<TelescopedParam<P1, P2>, P3>, P4>
>;

export function array<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  P1,
  F2 extends Focus,
  VT2 extends ValueTypeArray,
  V2,
  CV2,
  R2,
  P2,
  F3 extends Focus,
  VT3 extends ValueTypeArray,
  V3,
  CV3,
  R3,
  P3,
  F4 extends Focus,
  VT4 extends ValueTypeArray,
  V4,
  CV4,
  R4,
  P4,
  F5 extends Focus,
  VT5 extends ValueTypeArray,
  V5,
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
  [F5, F4, F3, F2, F1],
  [VT5, VT4, VT3, VT2, VT1],
  [V5, V4, V3, V2, V1],
  [CV5, CV4, CV3, CV2, CV1],
  R5 & R4 & R3 & R2 & R1,
  TelescopedParam<
    TelescopedParam<TelescopedParam<TelescopedParam<P1, P2>, P3>, P4>,
    P5
  >
>;

export function array<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  P1,
  F2 extends Focus,
  VT2 extends ValueTypeArray,
  V2,
  CV2,
  R2,
  P2,
  F3 extends Focus,
  VT3 extends ValueTypeArray,
  V3,
  CV3,
  R3,
  P3,
  F4 extends Focus,
  VT4 extends ValueTypeArray,
  V4,
  CV4,
  R4,
  P4,
  F5 extends Focus,
  VT5 extends ValueTypeArray,
  V5,
  CV5,
  R5,
  P5,
  F6 extends Focus,
  VT6 extends ValueTypeArray,
  V6,
  CV6,
  R6,
  P6
>(
  l1: Lens<F6, VT6, V6, CV6, R6, P6>,
  l2: Lens<F5, VT5, V5, CV5, R5, P5>,
  l3: Lens<F4, VT4, V4, CV4, R4, P4>,
  l4: Lens<F3, VT3, V3, CV3, R3, P3>,
  l5: Lens<F2, VT2, V2, CV2, R2, P2>,
  l6: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  [F6, F5, F4, F3, F2, F1],
  [VT6, VT5, VT4, VT3, VT2, VT1],
  [V6, V5, V4, V3, V2, V1],
  [CV6, CV5, CV4, CV3, CV2, CV1],
  R6 & R5 & R4 & R3 & R2 & R1,
  TelescopedParam<
    TelescopedParam<
      TelescopedParam<TelescopedParam<TelescopedParam<P1, P2>, P3>, P4>,
      P5
    >,
    P6
  >
>;

export function array<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  P1,
  F2 extends Focus,
  VT2 extends ValueTypeArray,
  V2,
  CV2,
  R2,
  P2,
  F3 extends Focus,
  VT3 extends ValueTypeArray,
  V3,
  CV3,
  R3,
  P3,
  F4 extends Focus,
  VT4 extends ValueTypeArray,
  V4,
  CV4,
  R4,
  P4,
  F5 extends Focus,
  VT5 extends ValueTypeArray,
  V5,
  CV5,
  R5,
  P5,
  F6 extends Focus,
  VT6 extends ValueTypeArray,
  V6,
  CV6,
  R6,
  P6,
  F7 extends Focus,
  VT7 extends ValueTypeArray,
  V7,
  CV7,
  R7,
  P7
>(
  l1: Lens<F7, VT7, V7, CV7, R7, P7>,
  l2: Lens<F6, VT6, V6, CV6, R6, P6>,
  l3: Lens<F5, VT5, V5, CV5, R5, P5>,
  l4: Lens<F4, VT4, V4, CV4, R4, P4>,
  l5: Lens<F3, VT3, V3, CV3, R3, P3>,
  l6: Lens<F2, VT2, V2, CV2, R2, P2>,
  l7: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  [F7, F6, F5, F4, F3, F2, F1],
  [VT7, VT6, VT5, VT4, VT3, VT2, VT1],
  [V7, V6, V5, V4, V3, V2, V1],
  [CV7, CV6, CV5, CV4, CV3, CV2, CV1],
  R7 & R6 & R5 & R4 & R3 & R2 & R1,
  TelescopedParam<
    TelescopedParam<
      TelescopedParam<
        TelescopedParam<TelescopedParam<TelescopedParam<P1, P2>, P3>, P4>,
        P5
      >,
      P6
    >,
    P7
  >
>;

export function array<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  P1,
  F2 extends Focus,
  VT2 extends ValueTypeArray,
  V2,
  CV2,
  R2,
  P2,
  F3 extends Focus,
  VT3 extends ValueTypeArray,
  V3,
  CV3,
  R3,
  P3,
  F4 extends Focus,
  VT4 extends ValueTypeArray,
  V4,
  CV4,
  R4,
  P4,
  F5 extends Focus,
  VT5 extends ValueTypeArray,
  V5,
  CV5,
  R5,
  P5,
  F6 extends Focus,
  VT6 extends ValueTypeArray,
  V6,
  CV6,
  R6,
  P6,
  F7 extends Focus,
  VT7 extends ValueTypeArray,
  V7,
  CV7,
  R7,
  P7,
  F8 extends Focus,
  VT8 extends ValueTypeArray,
  V8,
  CV8,
  R8,
  P8
>(
  l1: Lens<F8, VT8, V8, CV8, R8, P8>,
  l2: Lens<F7, VT7, V7, CV7, R7, P7>,
  l3: Lens<F6, VT6, V6, CV6, R6, P6>,
  l4: Lens<F5, VT5, V5, CV5, R5, P5>,
  l5: Lens<F4, VT4, V4, CV4, R4, P4>,
  l6: Lens<F3, VT3, V3, CV3, R3, P3>,
  l7: Lens<F2, VT2, V2, CV2, R2, P2>,
  l8: Lens<F1, VT1, V1, CV1, R1, P1>
): Lens<
  [F8, F7, F6, F5, F4, F3, F2, F1],
  [VT8, VT7, VT6, VT5, VT4, VT3, VT2, VT1],
  [V8, V7, V6, V5, V4, V3, V2, V1],
  [CV8, CV7, CV6, CV5, CV4, CV3, CV2, CV1],
  R8 & R7 & R6 & R5 & R4 & R3 & R2 & R1,
  TelescopedParam<
    TelescopedParam<
      TelescopedParam<
        TelescopedParam<
          TelescopedParam<TelescopedParam<TelescopedParam<P1, P2>, P3>, P4>,
          P5
        >,
        P6
      >,
      P7
    >,
    P8
  >
>;

export function array(...args): any {
  return {
    focus: args.map(arg => arg.focus),
    valueType: args.map(arg => arg.valueType),
    view: (s, param?) => args.map(arg => arg.view(s, param)),
    viewOver: (s, f, param?) => {
      args.forEach((arg, i) => arg.viewOver(s, f[i], param));
    },
    set: (s, v, param?) =>
      produce(s, draftS => {
        args.forEach((arg, i) => {
          arg.setTransient(draftS, v[i], param);
        });
      }),
    setTransient: (s, v, param?) => {
      args.forEach((arg, i) => {
        arg.setTransient(s, v[i], param);
      });
    },
    setOver: (s, f, param?) =>
      produce(s, draftS => {
        args.forEach((arg, i) => {
          arg.setOverTransient(draftS, f[i], param);
        });
      }),
    setOverTransient: (s, f, param?) => {
      args.forEach((arg, i) => {
        arg.setOverTransient(s, f[i], param);
      });
    }
  };
}
