import { ChatType, BotErrorMessage } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class DonateCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "donate", ["!donate"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState): void {
        try {
            this.respond(
                channel,
                userstate,
                "Head over to https://hextooltip.com and click Donate. Any donations are greatly appreciated!"
            );
        } catch (error) {
            this.error(channel, userstate);
        }
    }
}

export default DonateCommand;
