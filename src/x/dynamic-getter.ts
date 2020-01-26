import Getter from './getter';
import { DynamicTarget } from '../target';

export default class DynamicGetter<V, P extends string | number> extends Getter<
  V[],
  DynamicTarget<V, P>
> {
  focus: () => Generator<P, void, unknown>;

  constructor(focus: () => Generator<P, void, unknown>) {
    super();
    this.focus = focus;
  }

  get<S extends DynamicTarget<V, P>>(s: S): V[] {
    const result: V[] = [];

    if (s) {
      const generator = this.focus();

      let key = generator.next();

      while (!key.done) {
        const val = (s as any)[key.value];
        if (val !== undefined) result.push(val);
        key = generator.next();
      }
    }

    return result;
  }
}
