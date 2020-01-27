import Getter from './getter';
import { Target, PathType, Value } from './target';

export default class StaticGetter<V, P extends string> extends Getter<
  V,
  Target<PathType.Static, P, V>
> {
  focus: P;

  constructor(focus: P) {
    super();
    this.focus = focus;
  }

  get<S extends Target<PathType.Static, P, V>>(
    s: S
  ): Value<PathType.Static, V> {
    return s ? s[this.focus] : undefined;
  }
}
