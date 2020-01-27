import { produce } from 'immer';
import Setter from './setter';
import { Target, PathType } from './target';

export default class DynamicSetter<V, P extends string | number> extends Setter<
  V[],
  Target<PathType.Dynamic, P, V>
> {
  focus: () => P[];

  constructor(focus: () => P[]) {
    super();
    this.focus = focus;
  }

  set<S extends Target<PathType.Dynamic, P, V>>(s: S, v: V[]): S {
    return produce(s, draft => {
      const d = draft;

      const f = this.focus();
      for (let i = 0; i < f.length; i += 1) {
        if (Array.isArray(s)) d[f[i] as number] = v[i];
        else d[f[i] as string] = v[i];
      }
    });
  }
}
