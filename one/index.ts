// Important: import this first
import * as alt from "two/alt";

// Only then import from our local fp-ts
import {alternative, array, nonEmptyArray, number, option} from "fp-ts";
import {pipe} from "fp-ts/function";
import {HKT, Kind, URIS} from "fp-ts/HKT";

export function altAllBy<F extends URIS>(
  F: alternative.Alternative1<F>,
): <A, B>(...fs: nonEmptyArray.NonEmptyArray<(a: A) => Kind<F, B>>) => (a: A) => Kind<F, B>;
export function altAllBy<F extends URIS>(
  F: alternative.Alternative<F>,
): <A, B>(...fs: nonEmptyArray.NonEmptyArray<(a: A) => HKT<F, B>>) => (a: A) => HKT<F, B> {
  return alt.altAllBy(F)(F.zero());
}

const result = pipe(
  [1, 3, 5, 7, 9],
  altAllBy(option.Alternative)(
    array.findFirst(x => x % 2 === 0),
    array.findFirst(x => x >= 10),
    array.findFirst(x => x >= 4)
  )
)

console.log('Result:', option.getEq(number.Eq).equals(result, option.some(5)))
