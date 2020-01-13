import produce from 'immer';
import { Setter } from './setter';
import { Getter } from './getter';
import { seriesOfGettersImpl } from './getter-series';

export function createSerieses(
  previousValue,
  currentValue,
  currentIndex,
  array
) {
  if (currentIndex === 0) return [...previousValue, currentValue];
  return [
    ...previousValue,
    seriesOfGettersImpl(...array.slice(0, currentIndex + 1))
  ];
}

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2
>(
  setters: [Setter<V2, P2, R2>, Setter<V1, P1, R1>],
  getters: [Getter<V2, P2, R2>]
): Setter<V1, P2, R2>;

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3
>(
  setters: [Setter<V3, P3, R3>, Setter<V2, P2, R2>, Setter<V1, P1, R1>],
  getters: [Getter<V3, P3, R3>, Getter<V2, P2, R2>]
): Setter<V1, P3, R3>;

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4
>(
  setters: [
    Setter<V4, P4, R4>,
    Setter<V3, P3, R3>,
    Setter<V2, P2, R2>,
    Setter<V1, P1, R1>
  ],
  getters: [Getter<V4, P4, R4>, Getter<V3, P3, R3>, Getter<V2, P2, R2>]
): Setter<V1, P4, R4>;

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4,
  V5 extends R4,
  P5 extends string | number,
  R5
>(
  setters: [
    Setter<V5, P5, R5>,
    Setter<V4, P4, R4>,
    Setter<V3, P3, R3>,
    Setter<V2, P2, R2>,
    Setter<V1, P1, R1>
  ],
  getters: [
    Getter<V5, P5, R5>,
    Getter<V4, P4, R4>,
    Getter<V3, P3, R3>,
    Getter<V2, P2, R2>
  ]
): Setter<V1, P5, R5>;

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4,
  V5 extends R4,
  P5 extends string | number,
  R5,
  V6 extends R5,
  P6 extends string | number,
  R6
>(
  setters: [
    Setter<V6, P6, R6>,
    Setter<V5, P5, R5>,
    Setter<V4, P4, R4>,
    Setter<V3, P3, R3>,
    Setter<V2, P2, R2>,
    Setter<V1, P1, R1>
  ],
  getters: [
    Getter<V6, P6, R6>,
    Getter<V5, P5, R5>,
    Getter<V4, P4, R4>,
    Getter<V3, P3, R3>,
    Getter<V2, P2, R2>
  ]
): Setter<V1, P6, R6>;

export function setterSeries(setters, getters) {
  const gettersSeries = getters.reduce(createSerieses, []);

  return (t, v, transient = false) => {
    let i = gettersSeries.length - 1;
    if (transient === false) {
      return produce(t, draftT => {
        setters.reduceRight((accumulator, currentValue) => {
          if (i >= 0) {
            const result = currentValue(
              gettersSeries[i](draftT),
              accumulator,
              true
            );
            i -= 1;
            return result;
          }
          return currentValue(draftT, accumulator, true);
        }, v);
      });
    }

    return setters.reduceRight((accumulator, currentValue) => {
      if (i >= 0) {
        const result = currentValue(
          gettersSeries[i](t),
          accumulator,
          transient
        );
        i -= 1;
        return result;
      }
      return currentValue(t, accumulator, transient);
    }, v);
  };
}
