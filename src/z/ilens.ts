import View from './view';
import { ValueType } from './target';

export default abstract class ILens<
  VT extends ValueType,
  VLU,
  IVLU,
  R
> extends View<VLU, IVLU, R> {
  abstract view<S extends R>(s: S): VLU;

  abstract viewOver<S extends R>(s: S, f: (v: IVLU) => void): void;

  abstract set<S extends R>(s: S, v: VLU): S;

  abstract setOver<S extends R>(s: S, f: (v: IVLU) => IVLU): S;

  abstract getValueType(): VT;
}
