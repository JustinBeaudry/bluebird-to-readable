<p align="center">
  <h1 align="center">bluebird-to-readable</h1>
</p>

<p align="center">
  Convert a Bluebird Promise to a Readable stream. In Typescript.
</p>

<p align="center">
  <img alt="Typescript 3.2" src="https://img.shields.io/badge/typescript-3.2-blue.svg">
  <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="Node 10.x.x" src="https://img.shields.io/badge/node-10.x.x-blue.svg">
</p>

## Install

```bash
  npm i -S bluebird-to-readable
```

## Usage

```typescript
import Bluebird from 'bluebird';
import {BluebirdToReadable} from 'bluebird-to-readable';

const promise: Bluebird<string> = Bluebird.resolve(`They're just questions Leon.\r\n`);

// new is private, you must call the static method `construct`
new BluebirdToReadable(promise); // error TS2673: Constructor of class 'BluebirdToReadable' is private and only accessible within the class declaration.

const readable = BluebirdToReadable.construct<string>(promise);

readable.pipe(process.stdout); // "They're just questions Leon."
```

## API

Though BluebirdToReadable is a class constructor, it's constructor is private. calling new will throw a `TS2673` error. Calling the static method `construct` is the preferred method to create instances.

### `BluebirdToReadable.construct<T>(Bluebird)`

This returns a paused (or non-flowing) `Readable` stream. Calling `.pipe()` or using the `readable` event and invoking `.read()` will un-pause or begin flowing data from the readable stream into the `Transform` or `Writable` stream.

If the `Bluebird` promise is destroyed before the promise has been resolved, and `Bluebird` has been configured to allow cancellation i.e., `Bluebird.config({cancellation: true});` the promise will be cancelled.

If for any reason the resolved value fails to push onto the readable stream i.e., `this.push(resolvedValue)` returns `false`, the promise will emit an error, and destroy itself.

To run `example.ts` install locally and run `npm run example`.
