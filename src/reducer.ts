import { FocusedReducer } from './focused-reducer';
import { KeyRestrictionExt } from './key-restriction';
import { lensArrayImpl } from './lens-array';

export type Reducer<R> = <S extends R>(s: S) => S;

export function reducer<V1, P1 extends KeyRestrictionExt, R1>(
  fR: [FocusedReducer<V1, P1, R1>]
): Reducer<R1>;

export function reducer<
  V1,
  P1 extends KeyRestrictionExt,
  R1,
  V2,
  P2 extends KeyRestrictionExt,
  R2
>(
  fr: [FocusedReducer<V1, P1, R1>, FocusedReducer<V2, P2, R2>]
): Reducer<R1 & R2>;

export function reducer(args) {
  const lensArray = lensArrayImpl(...args.map(fr => fr.focus));
  const filterArray = args.map(fr => fr.filter);
  const conditionArray = args.map(fr => fr.condition);

  return s => {
    return lensArray(
      s,
      lensArray(s).map((v, i) =>
        conditionArray[i] !== undefined && !conditionArray[i](s)
          ? v
          : filterArray[i](s, v)
      )
    );
  };
}
