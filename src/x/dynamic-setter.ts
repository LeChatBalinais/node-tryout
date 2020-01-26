import { produce } from 'immer';
import Setter from './setter';
import { DynamicTarget } from '../target';

export default class DynamicSetter<V, P extends string | number> extends Setter<
  V[],
  DynamicTarget<V, P>
> {
  focus: () => Generator<P, void, unknown>;

  constructor(focus: () => Generator<P, void, unknown>) {
    super();
    this.focus = focus;
  }

  set<S extends DynamicTarget<V, P>>(s: S, v: V[]): S {
    return produce(s, draft => {
      const g = this.focus();

      const d = draft;

      let x = g.next();
      let i = 0;
      while (!x.done) {
        if (Array.isArray(s)) d[x.value as number] = v[i];
        else d[x.value as string] = v[i];
        i += 1;
        x = g.next();
      }
    });
  }
}
