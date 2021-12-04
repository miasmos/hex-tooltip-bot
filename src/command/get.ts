import { Language } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class GetCommand extends Command {
    helpText =
        "!get - Displays a random Dbd perk, addon, item, killer, survivor, power, or map. | !get {name} - Displays the perk, addon, item, killer, survivor, power, or map that matches {name} the closest.";

    constructor(clients: BotClients, state: State) {
        super(clients, "get", ["!get"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const name = params.join(" ");
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const model = name.length === 0 ? Dbd.random([], [], language) : Dbd.get(name, language);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "get"));
        } else {
            this.respond(channel, userstate, `${DbdUtil.stringify(model)} @${userstate.username}`);
        }
    }
}

export default GetCommand;
