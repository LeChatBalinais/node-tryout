import { Target, DynamicTarget } from './target';
import { KeyRestriction } from './key-restriction';

export interface Getter<
  V,
  PropertyName extends KeyRestriction,
  R = Target<V, PropertyName>
> {
  <T extends R>(t: T): V;
  focus: PropertyName;
}

export type DynamicGetter<V> = <
  PropertyName extends number | string,
  R = DynamicTarget<V, PropertyName>
>(
  focus: PropertyName
) => Getter<V, PropertyName, R>;

export function getter<PropertyName extends number>(
  focus: PropertyName
): <V, R = Target<V, PropertyName>>() => Getter<V, PropertyName, R>;

export function getter<PropertyName extends string>(
  focus: PropertyName
): <V, R = Target<V, PropertyName>>() => Getter<V, PropertyName, R>;

export function getter<V>(): DynamicGetter<V>;

export function getter(...args) {
  if (args.length > 0)
    return () =>
      Object.assign(t => (t ? t[args[0]] : undefined), { focus: args[0] });

  return focus => Object.assign(t => (t ? t[focus] : undefined), { focus });
}
