enum PropType {
  Dynamic,
  Static
}

type PropTypeRestriction<P extends string | number> = P extends string
  ? PropType.Dynamic | PropType.Static
  : PropType.Dynamic;

type DefaultPropType<P extends string | number> = P extends string
  ? PropType.Static
  : PropType.Dynamic;

interface Link<
  V,
  P extends string | number,
  T extends PropTypeRestriction<P> = DefaultPropType<P>
> {
  val: P;
}

function link<P extends string>(val: P): <V>() => Link<V, P>;
function link<T extends PropType>(val: string): <V>() => Link<V, string, T>;
function link(val: number): <V>() => Link<V, number>;

function link(
  val: string | number
): () => Link<any, string | number, PropType.Dynamic | PropType.Static> {
  return () => ({
    val
  });
}

export type TargetValue<
  V,
  P extends string | number,
  T extends PropType.Dynamic | PropType.Static
> = P extends string
  ? T extends PropType.Static
    ? {
        [PN in P]: V;
      }
    : { [ID: string]: V }
  : V[];

function path<P extends string | number, T extends PropTypeRestriction<P>, V>(
  l: Link<V, P, T>
): [Link<V, P, T>];

function path<
  P1 extends string | number,
  P2 extends string | number,
  T1 extends PropTypeRestriction<P1>,
  T2 extends PropTypeRestriction<P2>,
  V1,
  V2 extends TargetValue<V1, P1, T1>
>(
  l1: Link<V2, P2, T2>,
  l2: Link<V1, P1, T1>
): [Link<V2, P2, T2>, Link<V1, P1, T1>];

function path<T extends any[]>(...args: T): T {
  return args;
}

type B = number[];

interface A {
  b: B;
}

interface O {
  a: A;
}

const o: O = { a: { b: [0, 1, 2, 3] } };

const l1 = link('a')<number>();
const l2 = link('c')<number>();

const l3: Link<string, 'a', PropType.Dynamic> = l1;

const p1 = path(l1, l2);
// const p2 = path(link(1)<number>());
