import { BotErrorMessage } from "./enum";

class BotError {
    message: BotErrorMessage | string = BotErrorMessage.Generic;

    constructor(message: BotErrorMessage | string, ...args: string[]) {
        if (message.length > 0) {
            this.message = args.reduce<string>((prev, current, index) => {
                const regex = new RegExp(`\\$${index}`, "g");
                return prev.replace(regex, current);
            }, message);
        }
    }
}

export default BotError;
