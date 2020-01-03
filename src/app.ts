import produce from 'immer';

const baseState = [
  {
    todo: 'Learn typescript',
    done: true
  },
  {
    todo: 'Try immer',
    done: false
  }
];

const nextState = produce(baseState, draftState => {
  const s = draftState;
  s.push({ todo: 'Tweet about it', done: false });
  s[1].done = true;
});

console.log(nextState);
