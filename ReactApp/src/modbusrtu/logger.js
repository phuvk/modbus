export class Logger {
    constructor(options) {
        this.options = options;
    }

    info(string) {  // TODO write to file in release
        if (this.options.debug) {
            console.log(string);
        }
    }
}