class Logger {
    static log(...args: unknown[]): void {
        // eslint-disable-next-line no-console
        console.log(...args);
    }

    static error(...args: unknown[]): void {
        // eslint-disable-next-line no-console
        console.error(...args);
    }
}

export default Logger;
