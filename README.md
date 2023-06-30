# Declaration merging problem reproduction

This repository demonstrates a problem when linking two packages that use a library that makes heavy use of declaration merging.

## Environment

Given two packages `/app` and `/lib` in a monorepo, Yarn workspaces lets us link them:

```json
{
  "name": "app",
  "depencencies": {
    "lib": "workspace:*"
  }
}
```

We use Yarn because one package (`/app`) requires the `node_modules` folder to reside inside the package's folder (a restriction of Meteor, the framework we use). NPM does not provide the option to do this at the moment.

## Preparation

Make sure Yarn is installed. Then install all dependencies with:

```shell
yarn
```

Then build the `/lib` package:

```shell
npx tsc -p lib/tsconfig.json
```

## Demonstration

When we now try to build the `/app` package:

```shell
npx tsc -p app/tsconfig.json
```

TypeScript will fail with the following error:

```shell
$ npx tsc -p app/tsconfig.json
lib/box.ts:18:40 - error TS2344: Type '"Box"' does not satisfy the constraint 'keyof URItoKind<any>'.

18 export const Pointed: pointed.Pointed1<URI> = {
                                          ~~~

Found 1 error in lib/box.ts:18
```

## Discussion

The problem is dependent on the import order of the library `fp-ts`. In `/app/index.ts`:

1. If `/lib` is imported before `fp-ts`, the build works
2. If `fp-ts` is imported before `/lib`, the build fails

The reason for the failure is that `fp-ts` makes heavy use of declaration merging for providing higher-kinded types (HKT). This fails if one kind of HKT is imported in `/lib` and another in `/app`, because two different instances of `fp-ts` will be used.
