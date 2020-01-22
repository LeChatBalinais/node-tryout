import { Condition } from './condition';
import { Lens } from './lens';
import { Filter } from './filter';
import { KeyRestrictionExt } from './key-restriction';

export interface FocusedReducer<V, P extends KeyRestrictionExt, S> {
  lens: Lens<V, P, S>;
  condition?: Condition<S>;
  filter: Filter<S, V>;
}

export function focusedReducers<V, P extends KeyRestrictionExt, FR, LR, CR>(
  d: [
    {
      lens: Lens<V, P, LR>;
      condition?: Condition<CR>;
      filter: Filter<FR, V>;
    }
  ]
): [FocusedReducer<V, P, LR & CR & FR>];

export function focusedReducers<
  V1,
  P1 extends KeyRestrictionExt,
  FR1,
  LR1,
  CR1,
  V2,
  P2 extends KeyRestrictionExt,
  FR2,
  LR2,
  CR2
>(
  d: [
    {
      lens: Lens<V1, P1, LR1>;
      condition?: Condition<CR1>;
      filter: Filter<FR1, V1>;
    },
    {
      lens: Lens<V2, P2, LR2>;
      condition?: Condition<CR2>;
      filter: Filter<FR2, V2>;
    }
  ]
): [
  FocusedReducer<V1, P1, LR1 & CR1 & FR1>,
  FocusedReducer<V2, P2, LR2 & CR2 & FR2>
];

export function focusedReducers(description) {
  return description.map(d => ({ ...d }));
}
