import Adb from '@devicefarmer/adbkit/lib/adb';
import { ExtendedClient } from './ExtendedClient';
import { ClientOptions } from '@devicefarmer/adbkit/lib/ClientOptions';

interface Options {
    host?: string;
    port?: number;
    bin?: string;
}

export class AdbExtended extends Adb {
    static createClient(options: Options = {}): ExtendedClient {
        const opts: ClientOptions = {
            bin: options.bin,
            host: options.host || process.env.ADB_HOST,
            port: options.port || 0,
        };
        if (!opts.port) {
            const port = parseInt(process.env.ADB_PORT || '', 10);
            if (!isNaN(port)) {
                opts.port = port;
            } else {
                opts.port = 5037;
            }
        }
        return new ExtendedClient(opts);
    }
}
