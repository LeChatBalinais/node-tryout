/* eslint-disable import/export */

import { ValueType } from './enums';

export type Focus = string | Focus[];

export type ValueTypeArray = ValueType | ValueTypeArray[];

export type Value<VT extends ValueType, V> = VT extends ValueType.Simple
  ? V
  : VT extends ValueType.Array
  ? V[]
  : { [ID in string]: V };

export type TelescopedValue<V, VT> = VT extends ValueType.Simple
  ? V
  : VT extends ValueType.Array
  ? V[]
  : VT extends ValueType.AssociativeArray
  ? { [ID in string]: V }
  : VT extends ValueTypeArray[]
  ? { [K in keyof VT]: TelescopedValue<V, VT[K]> }
  : never;

type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;

export type Target<F, VT, V> = VT extends ValueType.Simple
  ? F extends string
    ? {
        [P in F]: V;
      }
    : never
  : VT extends ValueType.Array
  ? F extends string
    ? { [P in F]: V[] }
    : never
  : VT extends ValueType.AssociativeArray
  ? F extends string
    ? { [P in F]: { [ID in string]: V } }
    : never
  : VT extends ValueTypeArray[]
  ? F extends Focus[]
    ? V extends any[]
      ? UnionToIntersection<
          {
            [K in keyof F]: K extends keyof VT & keyof V
              ? F[K] extends Focus
                ? Target<F[K], VT[K], V[K]>
                : F[K]
              : F[K];
          }[number]
        >
      : never
    : never
  : never;

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
  ? (<S extends R>(s: S) => V) & ((s: R) => V)
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

type Rule<R, V> = <S extends R>(s: S, v: V) => S;

type Condition<R> = <R>(s: R) => boolean;

export function opticalReducer<
  F1 extends Focus,
  VT1 extends ValueTypeArray,
  V1,
  CV1,
  R1,
  RG1,
  P1
>(
  r1: [Lens<F1, VT1, V1, CV1, R1, P1>, Rule<RG1, V1>, (s: R1) => boolean]
): <S extends R1 & RG1>(s: S) => S;

export function rule<V>(f: (v?: V) => V): Rule<any, V>;

export function rule<V1, R1, V>(
  getters: [(s: R1) => V1],
  f: (gv1: V1, v?: V) => V
): Rule<R1, V>;

export function rule<V1, R1, V2, R2, V>(
  getters: [(s: R1) => V1, (s: R2) => V2],
  f: (gv1: V1, gv2: V2, v?: V) => V
): Rule<R1 & R2, V>;

export function rule<V1, R1, V2, R2, V>(
  getters: [(s: R1) => V1, (s: R2) => V2],
  f: (gv1: V1, gv2: V2, v?: V) => V
): Rule<R1 & R2, V>;

export function rule<V1, R1, V2, R2, V3, R3, V>(
  getters: [(s: R1) => V1, (s: R2) => V2, (s: R3) => V3],
  f: (gv1: V1, gv2: V2, gv3: V3, v?: V) => V
): Rule<R1 & R2 & R3, V>;

export function rule<V1, R1, V2, R2, V3, R3, V4, R4, V>(
  getters: [(s: R1) => V1, (s: R2) => V2, (s: R3) => V3, (s: R4) => V4],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, v?: V) => V
): Rule<R1 & R2 & R3 & R4, V>;

export function rule<V1, R1, V2, R2, V3, R3, V4, R4, V5, R5, V>(
  getters: [
    (s: R1) => V1,
    (s: R2) => V2,
    (s: R3) => V3,
    (s: R4) => V4,
    (s: R5) => V5
  ],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, gv5: V5, v?: V) => V
): Rule<R1 & R2 & R3 & R4 & R5, V>;

export function condition(f: () => boolean): <S>(s: S) => boolean;

export function condition<V1, R1>(
  getters: [(s: R1) => V1],
  f: (gv1: V1) => boolean
): Condition<R1>;

export function condition<V1, R1, V2, R2>(
  getters: [(s: R1) => V1, (s: R2) => V2],
  f: (gv1: V1, gv2: V2) => boolean
): Condition<R1 & R2>;

export function condition<V1, R1, V2, R2, V3, R3>(
  getters: [(s: R1) => V1, (s: R2) => V2, (s: R3) => V3],
  f: (gv1: V1, gv2: V2, gv3: V3) => boolean
): Condition<R1 & R2 & R3>;

export function condition<V1, R1, V2, R2, V3, R3, V4, R4>(
  getters: [(s: R1) => V1, (s: R2) => V2, (s: R3) => V3, (s: R4) => V4],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4) => boolean
): Condition<R1 & R2 & R3 & R4>;

export function condition<V1, R1, V2, R2, V3, R3, V4, R4, V5, R5>(
  getters: [
    (s: R1) => V1,
    (s: R2) => V2,
    (s: R3) => V3,
    (s: R4) => V4,
    (s: R5) => V5
  ],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, gv5: V5) => boolean
): Condition<R1 & R2 & R3 & R4 & R5>;
