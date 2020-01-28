export enum PathType {
  Static,
  Dynamic
}

export type SequencePathType<
  P1 extends PathType,
  P2 extends PathType
> = P1 extends PathType.Dynamic
  ? PathType.Dynamic
  : P2 extends PathType.Dynamic
  ? PathType.Dynamic
  : PathType.Static;

export function sequencePathType<P1 extends PathType, P2 extends PathType>(
  pt1: P1,
  pt2: P2
): SequencePathType<P1, P2> {
  if (pt1 === PathType.Dynamic || pt2 === PathType.Dynamic)
    return PathType.Dynamic as SequencePathType<P1, P2>;
  return PathType.Static as SequencePathType<P1, P2>;
}

export type Value<PathType, V> = PathType extends PathType.Static ? V : V[];

export type StaticTarget<PropertyName, V> = PropertyName extends string
  ? {
      [P in PropertyName]: V;
    }
  : PropertyName extends number
  ? V[]
  : {};

export type DynamicTarget<PropertyName, V> = PropertyName extends string
  ? {
      [ID: string]: V;
    }
  : PropertyName extends number
  ? V[]
  : {};

export type Target<
  T extends PathType,
  PropertyName,
  V
> = T extends PathType.Static
  ? StaticTarget<PropertyName, V>
  : DynamicTarget<PropertyName, V>;

export type Focus<T extends PathType, PropertyName> = T extends PathType.Dynamic
  ? () => PropertyName[]
  : PropertyName;
