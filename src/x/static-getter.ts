import Getter from './getter';
import { Target } from '../target';

export default class StaticGetter<V, P extends string> extends Getter<
  V,
  Target<V, P>
> {
  focus: P;

  constructor(focus: P) {
    super();
    this.focus = focus;
  }

  get<S extends Target<V, P>>(s: S): V {
    return s ? s[this.focus] : undefined;
  }
}
