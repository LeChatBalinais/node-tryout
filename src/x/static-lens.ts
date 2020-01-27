import applyMixins from './apply-mixins';
import StaticGetter from './static-getter';
import StaticSetter from './static-setter';
import Lens from './lens';
import { PathType } from './target';

export class StaticLens<V, P extends string> extends Lens<
  V,
  P,
  PathType.Static
> {
  pathType: PathType.Static = PathType.Static;

  constructor(focus: P) {
    super();
    this.focus = focus;
    this.pathType = PathType.Static;
  }

  getPathType(): PathType.Static {
    return this.pathType;
  }
}

export interface StaticLens<V, P extends string>
  extends StaticGetter<V, P>,
    StaticSetter<V, P> {}

export function staticLens<V>() {
  return <P extends string>(p: P): StaticLens<V, P> => new StaticLens<V, P>(p);
}

applyMixins(StaticLens, [StaticGetter, StaticSetter]);
