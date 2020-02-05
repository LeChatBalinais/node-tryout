// // import produce from 'immer';
// // import Lens from './lens';
// // import {
// //   PathType,
// //   Target,
// //   Value,
// //   SequencePathType,
// //   sequencePathType,
// //   Focus
// // } from './target';
// // import Getter from './getter';
// // import Setter from './setter';
// // import applyMixins from './apply-mixins';
// import ILens from './ilens';

// export default class Telescope<
//   V,
//   P1,
//   T1 extends PathType,
//   T extends PathType,
//   R
// > extends ILens<V, P1, T, R, Focus<T1, P1>> {
//   key: Focus<T1, P1>;

//   pathType: T;

//   getFunc: <S extends R>(s: S) => Value<T, V>;

//   setFunc: <S extends R>(s: S, v: Value<T, V>) => S;

//   constructor(
//     key: Focus<T1, P1>,
//     pathType: T,
//     getFunc: <S extends R>(s: S) => Value<T, V>,
//     setFunc: <S extends R>(s: S, v: Value<T, V>) => S
//   ) {
//     super();
//     this.key = key;
//     this.pathType = pathType;
//     this.getFunc = getFunc;
//     this.setFunc = setFunc;
//   }

//   view<S extends R>(s: S): VLU;

//   viewOver<S extends R>(s: S, f: (v: IVLU) => void): void;

//   set<S extends R>(s: S, v: VLU): S;

//   setOver<S extends R>(s: S, f: (v: IVLU) => IVLU): S;
// }

// export function telescope<
//   V1,
//   P1,
//   T1 extends PathType,
//   R1,
//   V2 extends Target<T1, P1, V1>,
//   P2,
//   T2 extends PathType,
//   R2
// >(
//   lenses: [ILens<V2, IV2, R2>, ILens<V1, IV1, R1>]
// ): LensSequence<
//   V1,
//   P2,
//   T2,
//   SequencePathType<T2, T1>,
//   Target<SequencePathType<T2, T1>, P2, V2>
// > {
//   const getFunc = <S extends Target<SequencePathType<T2, T1>, P2, V2>>(
//     s: S
//   ): Value<SequencePathType<T2, T1>, V1> => {
//     let arrLevel = 0;
//     return lenses.reduce((accumulator, currentValue) => {
//       const result = (currentValue as any).get(accumulator);
//       if (currentValue.getPathType() === PathType.Dynamic) arrLevel += 1;
//       return result;
//     }, s);
//   };

//   const setFunc = <S extends Target<SequencePathType<T2, T1>, P2, V2>>(
//     s: S,
//     v: Value<SequencePathType<T2, T1>, V1>
//   ): S => {
//     return produce(s, draftS => {
//       const focused = lenses.reduce((accumulator, lens, i, array) => {
//         return i === array.length - 1
//           ? accumulator
//           : (lens as any).get(accumulator);
//       }, draftS);
//       (lenses[lenses.length - 1] as any).set(focused, v);
//     });
//   };

//   return new LensSequence<
//     V1,
//     P2,
//     T2,
//     SequencePathType<T2, T1>,
//     Target<SequencePathType<T2, T1>, P2, V2>
//   >(
//     lenses[0].getFocus(),
//     sequencePathType(lenses[0].getPathType(), lenses[1].getPathType()),
//     getFunc,
//     setFunc
//   );
// }
