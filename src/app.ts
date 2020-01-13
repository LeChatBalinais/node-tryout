import { getter, Getter } from './getter';

const gA: Getter<number, 'a', { a: number }> = getter('a')<number>();

console.log(gA({ a: 3 }));
