<p align="center">
  <h1 align="center">bluebird-to-readable</h1>
</p>

<p align="center">
  TypeScript library to convert a Bluebird Promise to a Readable stream.
</p>

<p align="center">
  <img src="https://badge.fury.io/js/bluebird-to-readable.svg" alt="npm version" height="18">
  <img src="https://travis-ci.org/JustinBeaudry/bluebird-to-readable.svg?branch=master" alt="Travis Status">
  <a href='https://coveralls.io/github/JustinBeaudry/bluebird-to-readable?branch=master'><img src='https://coveralls.io/repos/github/JustinBeaudry/bluebird-to-readable/badge.svg?branch=master' alt='Coverage Status' /></a>
  <a href="https://codeclimate.com/github/JustinBeaudry/bluebird-to-readable/maintainability"><img src="https://api.codeclimate.com/v1/badges/cb8db67dfc746d85d1f0/maintainability" /></a>
</p>
<p align="center">
  <img alt="Typescript 3.2" src="https://img.shields.io/badge/typescript-3.2-blue.svg">
  <a href="https://raw.githubusercontent.com/JustinBeaudry/bluebird-to-readable/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <img alt="Node 10.x.x" src="https://img.shields.io/badge/node-10.x.x-blue.svg">
</p>

## Why Bluebird and not Core Promise?
This project is explicitly designed to work with Bluebird Promises because of the feature-rich API it provides. Not convinced?

* http://bluebirdjs.com/docs/why-bluebird.html
* https://medium.com/@housecor/5-reasons-to-keep-using-bluebird-for-promises-a4f59c8a5d69

## Install

```bash
  npm i -S bluebird-to-readable
```

## Usage

```typescript
import Bluebird from 'bluebird';
import {BluebirdToReadable} from 'bluebird-to-readable';

const promise: Bluebird<string> = Bluebird.resolve(`They're just questions Leon.\r\n`);

// The Type Generic is optional and defaults to `any`
const readable = BluebirdToReadable<string>(promise);

readable.pipe(process.stdout); // "They're just questions Leon."
```

## API

### `BluebirdToReadable<T=any>(Bluebird<T>)`

This returns a paused (or non-flowing) `Readable` stream. Calling `.pipe()` or using the `readable` event and invoking `.read()` will un-pause or begin flowing data from the readable stream into the `Transform` or `Writable` stream.

If the `Bluebird` promise is destroyed before the promise has been resolved, and `Bluebird` has been configured to allow cancellation i.e., `Bluebird.config({cancellation: true});` the promise will be cancelled.

If for any reason the resolved value fails to push onto the readable stream i.e., `this.push(resolvedValue)` returns `false`, the promise will emit an error, and destroy itself.

To run `example.ts` install locally and run `npm run example`.
