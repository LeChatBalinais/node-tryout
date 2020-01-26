export default abstract class Setter<V, R> {
  abstract set<S extends R>(s: S, v: V): S;
}
