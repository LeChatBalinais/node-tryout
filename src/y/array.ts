import produce from 'immer';
import { Lens, SubFocusGenerator } from './lens';
import { Target, ValueType } from '../z/target';
import { TelescopedParam } from './telescope';

type ViewFuncA<V, R, P> = P extends undefined
  ? <S extends R>(s: S) => V
  : <S extends R, PRM extends P>(s: S, param: PRM) => V;

export interface ViewA<V, R, P> {
  view: ViewFuncA<V, R, P>;
}

type ViewOverFuncA<V, R, P> = P extends undefined
  ? <S extends R>(s: S, f: (v: V) => void) => void
  : <S extends R, PRM extends P>(s: S, f: (v: V) => void, param: PRM) => void;

export interface ViewOverA<V, R, P> {
  viewOver: ViewOverFuncA<V, R, P>;
}

type SetFuncA<V, R, P> = P extends undefined
  ? <S extends R>(s: S, v: V) => S
  : <S extends R, PRM extends P>(s: S, v: V, param: PRM) => S;

export interface SetA<V, R, P> {
  set: SetFuncA<V, R, P>;
  setTransient: SetFuncA<V, R, P>;
}

type SetOverFuncA<V, R, P> = P extends undefined
  ? <S extends R>(s: S, f: (v: V) => V) => S
  : <S extends R, PRM extends P>(s: S, f: (v: V) => V, param: PRM) => S;

export interface SetOverA<V, R, P> {
  setOver: SetOverFuncA<V, R, P>;
  setOverTransient: SetOverFuncA<V, R, P>;
}

export interface LensA<F, VT, V, CV, R, P = undefined>
  extends ViewA<CV, R, P>,
    ViewOverA<V, R, P>,
    SetA<CV, R, P>,
    SetOverA<V, R, P> {
  focus: F;
  valueType: VT;
  subFocus?: undefined;
}

export function array<
  F1 extends string,
  VT1 extends ValueType,
  V1,
  CV1,
  R1,
  P1,
  F2 extends string,
  VT2 extends ValueType,
  V2,
  CV2,
  R2,
  P2
>(
  l1: Lens<F2, VT2, V2, CV2, R2, P2>,
  l2: Lens<F1, VT1, V1, CV1, R1, P1>
): LensA<
  [F2, F1],
  [VT2, VT1],
  [V2, V1],
  [CV2, CV1],
  R2 & R1,
  TelescopedParam<P1, P2>
>;

export function array(...args): any {
  return {
    focus: args.map(arg => arg.focus),
    valueType: args.map(arg => arg.valueType),
    view: (s, param?) => args.map(arg => arg.view(s, param)),
    viewOver: (s, f, param?) => {
      f(args.map(arg => arg.view(s, param)));
    }
  };
}
