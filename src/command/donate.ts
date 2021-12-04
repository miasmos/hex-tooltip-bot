import { ChatType } from "../enum";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class DonateCommand extends Command {
    helpText = "!donate - Displays information about donating to support Hex: Tooltip.";

    constructor(clients: BotClients, state: State) {
        super(clients, "donate", ["!donate"], [ChatType.Command, ChatType.Whisper], state);
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
