
import { ValueType } from '../z/target';


export interface View<R, V> {

    view: <S extends R>(s: S) => V;

}


export default abstract class ILens<
    F,
    VT extends ValueType,
    VLU,
    IVLU,
    R
    > extends View<VLU, IVLU, R> {
    abstract view<S extends R>(s: S): VLU;

    abstract viewOver<S extends R>(s: S, f: (v: IVLU) => void): void;

    abstract set<S extends R>(s: S, v: VLU, transient?: boolean): S;

    abstract setOver<S extends R>(
        s: S,
        f: (v: IVLU) => IVLU,
        transient?: boolean
    ): S;

    abstract getValueType(): VT;

    abstract getFocus(): F;
}
