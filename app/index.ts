import "fp-ts"; // Fails if this import is here, succeeds if it isn't
import * as box from "lib/box";

console.log(box.Pointed.of(3))
