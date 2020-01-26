export default abstract class Lens<V, R> {
  abstract get<S extends R>(s: S): V;

  abstract set<S extends R>(s: S, v: V): S;
}
