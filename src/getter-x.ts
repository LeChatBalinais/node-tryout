import { Target, DynamicTarget } from './target';
import { KeyRestrictionExt, KeyRestriction } from './key-restriction';

export interface Getter<V, R> {
  <S extends R>(t: S): V;
}

export type DynamicGetter<V> = <PropertyName extends KeyRestrictionExt>(
  focus: PropertyName
) => Getter<V[], DynamicTarget<V, PropertyName>>;

export function getter<PropertyName extends KeyRestriction>(
  focus: PropertyName
): <V>() => Getter<V, Target<V, PropertyName>>;

export function getter<V>(): DynamicGetter<V>;

export function getter(...args) {
  if (args.length > 0) return () => t => (t ? t[args[0]] : undefined);

  const g = focus => t => {
    if (t) {
      const result = t[focus];
      if (result === undefined) return [];
      return [result];
    }

    return [];
  };

  g.dynamic = true;

  return g;
}
