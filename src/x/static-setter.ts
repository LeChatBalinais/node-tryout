import Setter from './setter';
import { Target, PathType, Value } from './target';

export default class StaticSetter<V, P extends string> extends Setter<
  V,
  Target<PathType.Static, P, V>
> {
  focus: P;

  constructor(focus: P) {
    super();
    this.focus = focus;
  }

  set<S extends Target<PathType.Static, P, V>>(
    s: S,
    v: Value<PathType.Static, V>
  ): S {
    return {
      ...s,
      [this.focus]: v
    };
  }
}
