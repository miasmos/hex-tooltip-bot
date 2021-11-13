import { ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";
import pkg from "../../package.json";

class PatchCommand extends Command {
    helpText = "!patch - Displays the current patch I'm on.";

    constructor(clients: BotClients) {
        super(clients, "patch", ["!patch"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState): void {
        this.respond(
            channel,
            userstate,
            `${pkg.dependencies["@stephenpoole/deadbydaylight"]
                .replace("^", "")
                .replace(/-[0-9]{1,2}/g, "")}`
        );
    }
}

export default PatchCommand;
