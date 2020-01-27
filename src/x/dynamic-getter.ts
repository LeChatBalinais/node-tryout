import Getter from './getter';
import { Target, PathType, Value } from './target';

export default class DynamicGetter<V, P extends string | number> extends Getter<
  Value<PathType.Dynamic, V>,
  Target<PathType.Dynamic, P, V>
> {
  focus: () => P[];

  constructor(focus: () => P[]) {
    super();
    this.focus = focus;
  }

  get<S extends Target<PathType.Dynamic, P, V>>(
    s: S
  ): Value<PathType.Dynamic, V> {
    const result: V[] = [];

    if (s) {
      const f = this.focus();
      for (let i = 0; i < f.length; i += 1) {
        const val = (s as any)[f[i]];
        if (val !== undefined) result.push(val);
      }
    }

    return result;
  }
}
