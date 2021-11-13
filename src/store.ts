import fs from "fs";
import path from "path";

class Store<T extends Record<string, unknown>> {
    data: T;
    name = "store";
    path = path.join(__dirname, "store.json");
    interval: NodeJS.Timeout;
    loaded = false;
    empty = false;

    constructor(name = "store") {
        this.setName(name);
        this.initialize();
    }

    setName(name: string): void {
        this.name = name;
        this.path = path.join(__dirname, `${name}.json`);
    }

    protected async initialize(): Promise<void> {
        await this.load();
        this.interval = setInterval(this.save.bind(this), 1000);
    }

    async load(): Promise<void> {
        try {
            const file = await fs.promises.readFile(this.path);
            const data = JSON.parse(file.toString());
            this.data = data;
        } catch (e) {
            // dne
            this.empty = true;
            this.data = {} as T;
        }
        this.loaded = true;
    }

    async save(): Promise<void> {
        return fs.promises.writeFile(this.path, JSON.stringify(this.data));
    }

    ready(): Promise<void> {
        if (this.loaded) {
            return Promise.resolve();
        }

        return new Promise(resolve => {
            const interval = setInterval(() => {
                if (this.loaded) {
                    clearInterval(interval);
                    resolve();
                }
            }, 10);
        });
    }
}

export default Store;
