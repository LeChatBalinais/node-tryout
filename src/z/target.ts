export enum ValueType {
  Simple,
  Array,
  AssociativeArray
}

export type Value<VT extends ValueType, V> = VT extends ValueType.Simple
  ? V
  : VT extends ValueType.Array
  ? V[]
  : { [ID in string]: V };

export type Target<
  F extends string,
  VT extends ValueType,
  V
> = VT extends ValueType.Simple
  ? {
      [P in F]: V;
    }
  : VT extends ValueType.Array
  ? { [P in F]: V[] }
  : { [P in F]: { [ID in string]: V } };
