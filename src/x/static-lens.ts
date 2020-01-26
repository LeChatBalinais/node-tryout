import applyMixins from './apply-mixins';
import StaticGetter from './static-getter';
import StaticSetter from './static-setter';
import Lens from './lens';
import { Target } from '../target';

export class StaticLens<V, P extends string> extends Lens<V, Target<V, P>> {
  constructor(focus: P) {
    super();
    this.focus = focus;
  }
}

export interface StaticLens<V, P extends string>
  extends StaticGetter<V, P>,
    StaticSetter<V, P> {}

export function staticLens<V>() {
  return <P extends string>(p: P): StaticLens<V, P> => new StaticLens<V, P>(p);
}

applyMixins(StaticLens, [StaticGetter, StaticSetter]);
