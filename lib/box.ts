import "fp-ts/HKT";
import {pointed} from "fp-ts";

export interface Box<A> {
  readonly value: A;
}

export const URI = "Box";

export type URI = typeof URI;

declare module "fp-ts/HKT" {
  interface URItoKind<A> {
    readonly [URI]: Box<A>;
  }
}

export const Pointed: pointed.Pointed1<URI> = {
  URI,
  of: (a) => ({value: a}),
}

