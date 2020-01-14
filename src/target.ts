export type Target<V, PropertyName> = PropertyName extends string
  ? {
      [P in PropertyName]: V;
    }
  : PropertyName extends number
  ? V[]
  : {};
