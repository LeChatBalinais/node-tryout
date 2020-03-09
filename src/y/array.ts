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
