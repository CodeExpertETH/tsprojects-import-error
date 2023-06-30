import * as nea from 'fp-ts/NonEmptyArray'
import * as alt from 'fp-ts/Alt';
import {HKT, Kind, URIS} from 'fp-ts/HKT';

export * from 'fp-ts/Alt';

export function altAllBy<F extends URIS>(
  F: alt.Alt1<F>,
): <B>(
  startWith: HKT<F, B>,
) => <A>(...fs: nea.NonEmptyArray<(a: A) => Kind<F, B>>) => (a: A) => Kind<F, B>;
export function altAllBy<F>(
  F: alt.Alt<F>,
): <B>(
  startWith: HKT<F, B>,
) => <A>(...fs: nea.NonEmptyArray<(a: A) => HKT<F, B>>) => (a: A) => HKT<F, B>;
export function altAllBy<F>(
  F: alt.Alt<F>,
): <B>(
  startWith: HKT<F, B>,
) => <A>(...fs: nea.NonEmptyArray<(a: A) => HKT<F, B>>) => (a: A) => HKT<F, B> {
  return (startWith) =>
    (...fs) =>
      (a) =>
        fs.reduce((mb, f) => F.alt(mb, () => f(a)), startWith);
}
