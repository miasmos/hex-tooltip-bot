class Limiter {
    keys: { [key: string]: number } = {};
    timeout = 1000;
    intervalTime = 1000;
    protected interval: NodeJS.Timeout;

    constructor(timeout = 1000) {
        this.timeout = timeout;
        this.interval = setInterval(this.tick.bind(this), this.intervalTime);
    }

    set(key: string): void {
        this.keys[key] = this.timeout;
    }

    delete(key: string): void {
        if (key in this.keys) {
            delete this.keys[key];
        }
    }

    get(key: string): boolean {
        return key in this.keys;
    }

    protected tick(): void {
        Object.entries(this.keys).forEach(([key, value]) => {
            if (value - this.intervalTime <= 0) {
                this.delete(key);
                return;
            }

            this.keys[key] -= this.intervalTime;
        });
    }
}

export default Limiter;
