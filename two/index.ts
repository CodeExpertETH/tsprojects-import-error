import {FunctionN} from 'fp-ts/function'

export const loud: FunctionN<[string], string> = (msg) => msg.toUpperCase()

export const assert = <A>(a1: A, a2: A): void => {
  if (a1 !== a2) throw new Error('Assertion failed')
}
