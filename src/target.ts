export type Target<V, PropertyName> = PropertyName extends string
  ? {
      [P in PropertyName]: V;
    }
  : PropertyName extends number
  ? V[]
  : {};

export type DynamicTarget<V, PropertyName> = PropertyName extends string
  ? {
      [ID: string]: V;
    }
  : PropertyName extends number
  ? V[]
  : {};
