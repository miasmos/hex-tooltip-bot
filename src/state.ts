import { Language } from "@stephenpoole/deadbydaylight";
import Store from "./store";
import { AppState } from "./types";

class State {
    store: Store<AppState> = new Store();

    protected clear(): void {
        this.store.data = {
            block: [],
            joined: [],
            language: {},
        };
    }

    getLanguage(user: string): Language {
        const { language } = this.store.data;
        if (user in language) {
            return language[user];
        }
        return Language.English;
    }

    setLanguage(user: string, newLanguage: Language): void {
        const { language } = this.store.data;
        if (newLanguage === Language.English) {
            if (user in language) {
                delete language[user];
            }
            return;
        }

        language[user] = newLanguage;
    }

    isBlocked(key: string): boolean {
        const { block } = this.store.data;
        return block.includes(key);
    }

    block(key: string): void {
        const { block } = this.store.data;
        if (!block.includes(key)) {
            block.push(key);
        }
        this.leave(key);
    }

    unblock(key: string): void {
        const { block } = this.store.data;
        if (block.includes(key)) {
            block.splice(block.indexOf(key), 1);
        }
    }

    join(key: string): void {
        const { joined } = this.store.data;
        if (!joined.includes(key)) {
            joined.push(key);
        }
    }

    leave(key: string): void {
        const { joined } = this.store.data;
        if (joined.includes(key)) {
            joined.splice(joined.indexOf(key), 1);
        }
    }

    joined(): string[] {
        return this.store.data.joined;
    }

    async ready(): Promise<void> {
        await this.store.ready();
        if (this.store.empty) {
            this.clear();
            this.store.empty = false;
        } else if (!("language" in this.store.data)) {
            this.store.data.language = {};
        }
    }
}

export default State;
