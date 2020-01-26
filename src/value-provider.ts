import { Getter } from './getter';
import { Lens } from './lens';
import { KeyRestrictionExt } from './key-restriction';
import { Target } from './target';

export type ValueProvider<
  V,
  PropertyName extends KeyRestrictionExt,
  R = Target<V, PropertyName>
> = Getter<V, PropertyName, R> | Lens<V, PropertyName, R>;
