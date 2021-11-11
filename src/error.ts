import { BotErrorMessage } from "./enum";

class BotError {
    message: BotErrorMessage | string = BotErrorMessage.Generic;

    constructor(message: BotErrorMessage | string, ...args: string[]) {
        this.message = args.reduce<string>((prev, current, index) => {
            const regex = new RegExp(`\\$${index}`, "g");
            return prev.replace(regex, current);
        }, message);
    }
}

export default BotError;
