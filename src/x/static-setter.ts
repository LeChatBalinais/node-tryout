import Setter from './setter';
import { Target } from '../target';

export default class StaticSetter<V, P extends string> extends Setter<
  V,
  Target<V, P>
> {
  focus: P;

  constructor(focus: P) {
    super();
    this.focus = focus;
  }

  set<S extends Target<V, P>>(s: S, v: V): S {
    return {
      ...s,
      [this.focus]: v
    };
  }
}
