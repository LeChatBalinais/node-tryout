import { ValueType, Target, Value } from '../z/target'
import { View } from './interface'

type NumberSubFocusGenerator = () => Generator<number, void, unknown>;
type StringSubFocusGenerator = () => Generator<string, void, unknown>;

type SubFocusGenerator<VT extends ValueType> = VT extends ValueType.Simple
    ? undefined
    : VT extends ValueType.Array
    ? NumberSubFocusGenerator
    : StringSubFocusGenerator;

export interface Lens<V,
    F extends string,
    VT extends ValueType,
    SF extends SubFocusGenerator<VT>> extends View<Target<F, VT, V>, Value<VT, V>> {

    focus: F;

    subFocus?: SF;

    valueType: VT;
    set: <S extends Target<F, VT, V>>(s: S, v: Value<VT, V>, transient = false) => S;
    setOver: <S extends Target<F, VT, V>>(
        s: S,
        f: (v: V) => V,
        transient = false
    ) => S
}


export function lens<V>(): <
    F extends string,
    VT extends ValueType = ValueType.Simple,
    SF extends SubFocusGenerator<VT> = undefined
    >(
    focus: F,
    valueType: VT,
    subFocus: SF
) => ILens<F, VT, Value<VT, V>, V, Target<F, VT, V>> {
    return <
        F extends string,
        VT extends ValueType = ValueType.Simple,
        SF extends SubFocusGenerator<VT> = undefined
    >(
        focus: F,
        valueType: VT,
        subFocus: SF
    ): ILens<F, VT, Value<VT, V>, V, Target<F, VT, V>> =>
        new Lens<V, F, VT, SF>(focus, subFocus, valueType);
}