export default abstract class Getter<V, R> {
  abstract get<S extends R>(s: S): V;
}
