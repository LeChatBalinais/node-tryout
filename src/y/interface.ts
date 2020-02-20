export interface View<V, R> {
  view: <S extends R>(s: S) => V;
}

export interface ViewOver<V, R> {
  viewOver: <S extends R>(s: S, f: (v: V) => void) => void;
}

export interface Set<V, R> {
  set: <S extends R>(s: S, v: V, transient?: boolean) => S;
}

export interface SetOver<V, R> {
  setOver: <S extends R>(s: S, f: (v: V) => V, transient?: boolean) => S;
}

export interface Lens<F, SF, VT, V, CV, R>
  extends View<CV, R>,
    ViewOver<V, R>,
    Set<CV, R>,
    SetOver<V, R> {
  focus: F;
  valueType: VT;
  subFocus?: SF;
}
