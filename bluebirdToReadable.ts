import { Readable } from 'stream';
import Bluebird from 'bluebird';

type CbAny = (...args: any[]) => void;

Bluebird.config({
  cancellation: true
});

Bluebird.setScheduler((scheduler: (callback: CbAny) => void) => {
  setImmediate(scheduler);
});

type MaybeErr = Error | null;
type DestroyCallback = (error: ( MaybeErr )) => void;
type ReadableOptions = {
  highWaterMark?: number;
  encoding?: string;
  objectMode?: boolean;
};

// noinspection JSUnusedGlobalSymbols
export class BluebirdToReadable<T=any> extends Readable {
  private promise: Bluebird<T>;
  // noinspection JSUnusedLocalSymbols
  private constructor(promise: Bluebird<T>, options?: ReadableOptions) {
    super(options);
    this.promise = promise;
  }
  public _read(): void {
    if (this.promise.isPending()) return;
    this.promise
        .then((value: T) => {
          if (!this.push(value)) {
            this.emit('error', Error('Failed to push value'));
          }
          this.push(null);
        })
        .catch((err: Error) => {
          this.emit('error', err);
          this.push(null);
        });
  }
  public _destroy(err: MaybeErr, callback: DestroyCallback): void {
    // cancel the promise if it's still pending
    this.promise.cancel();
    callback(err);
  }
  // noinspection JSUnusedGlobalSymbols
  static construct<K>(promise: Bluebird<K>): BluebirdToReadable<K> {
    return Reflect.construct(BluebirdToReadable, [promise]);
  }
}
