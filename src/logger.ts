class Logger {
    log(...args: unknown[]): void {
        // eslint-disable-next-line no-console
        console.log(...args);
    }

    error(...args: unknown[]): void {
        // eslint-disable-next-line no-console
        console.error(...args);
    }
}

export default Logger;
