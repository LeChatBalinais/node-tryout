export type Target<
  V,
  PropertyName extends string | number
> = PropertyName extends string
  ? {
      [P in PropertyName]: V;
    }
  : PropertyName extends number
  ? V[]
  : null;
