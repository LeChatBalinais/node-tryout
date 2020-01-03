import { __, replace, add } from 'ramda';

const greet = replace('{name}', __, 'Hello, {name}!');

console.log(greet('Alice'));

console.log(add(7, 10));
