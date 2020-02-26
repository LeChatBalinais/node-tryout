import { Lens } from './lens';
import { TelescopedValue, Target, ValueType } from '../z/target';

type TelescopedParam<P1, P2> = P1 extends undefined
  ? P2
  : P2 extends undefined
  ? P1
  : P1 & P2;

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
  TelescopedValue<TelescopedValue<TelescopedValue<V1, VT1>, VT2>, VT2>,
  R3,
  TelescopedParam<P1, TelescopedParam<P2, P3>>
>;

export function telescope(...args): any {
  return {
    focus: args[0].focus,
    valueType: args[0].valueType,
    subFocus: undefined
  };
}
