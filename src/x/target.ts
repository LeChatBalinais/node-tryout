export enum PathType {
  Static,
  Dynamic
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
