import { ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";
import pkg from "../../package.json";
import State from "../state";

class PatchCommand extends Command {
    helpText = "!patch - Display the current patch I'm on.";

    constructor(clients: BotClients, state: State) {
        super(clients, "patch", ["!patch"], [ChatType.Command, ChatType.Whisper], state);
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
