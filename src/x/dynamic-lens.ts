import applyMixins from './apply-mixins';
import Lens from './lens';
import DynamicSetter from './dynamic-setter';
import DynamicGetter from './dynamic-getter';
import { PathType, Focus } from './target';

export class DynamicLens<V, P extends string | number> extends Lens<
  V,
  P,
  PathType.Dynamic
> {
  pathType: PathType.Dynamic = PathType.Dynamic;

  constructor(focus: () => P[]) {
    super();
    this.focus = focus;
  }

  getPathType(): PathType.Dynamic {
    return this.pathType;
  }

  getFocus(): Focus<PathType.Dynamic, P> {
    return this.focus;
  }
}

export interface DynamicLens<V, P extends string | number>
  extends DynamicGetter<V, P>,
    DynamicSetter<V, P> {}

export function dynamicLens<V>() {
  return <P extends string | number>(p: () => P[]): DynamicLens<V, P> =>
    new DynamicLens<V, P>(p);
}

applyMixins(DynamicLens, [DynamicGetter, DynamicSetter]);
