export default abstract class View<VLU, IVLU, R> {
  abstract view<S extends R>(s: S): VLU;

  abstract viewOver<S extends R>(s: S, f: (v: IVLU) => void): void;
}
