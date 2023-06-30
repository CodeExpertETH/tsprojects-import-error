/**
 * This file does not compile if the `import "fp-ts" line is present.
 *
 * The error reads:
 *
 *     $ npx tsc -p app/tsconfig.json
 *     lib/box.ts:18:40 - error TS2344: Type '"Box"' does not satisfy the constraint 'keyof URItoKind<any>'.
 *
 *     18 export const Pointed: pointed.Pointed1<URI> = {
 *                                             ~~~
 *
 *     Found 1 error in lib/box.ts:18
 */
import "fp-ts";
import * as box from "lib/box";

console.log(box.Pointed.of(3))
