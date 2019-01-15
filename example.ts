import Bluebird from 'bluebird';
import {BluebirdToReadable} from './bluebirdToReadable';

const promise = Bluebird.resolve(`They're just questions Leon.\r\n`);
const readable = BluebirdToReadable.construct<string>(promise);

readable.pipe(process.stdout);
