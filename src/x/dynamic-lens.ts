import applyMixins from './apply-mixins';
import Lens from './lens';
import { DynamicTarget } from '../target';
import DynamicSetter from './dynamic-setter';
import DynamicGetter from './dynamic-getter';

export class DynamicLens<V, P extends string | number> extends Lens<
  V[],
  DynamicTarget<V, P>
> {
  constructor(focus: () => Generator<P, void, unknown>) {
    super();
    this.focus = focus;
  }
}

export interface DynamicLens<V, P extends string | number>
  extends DynamicGetter<V, P>,
    DynamicSetter<V, P> {}

export function dynamicLens<V>() {
  return <P extends string | number>(
    p: () => Generator<P, void, unknown>
  ): DynamicLens<V, P> => new DynamicLens<V, P>(p);
}

applyMixins(DynamicLens, [DynamicGetter, DynamicSetter]);
