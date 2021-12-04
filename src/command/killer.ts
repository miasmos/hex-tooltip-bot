import { Language, PlayerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class KillerCommand extends Command {
    helpText =
        "!killer - Displays a random killer. | !killer {name} - Displays the {name} killer, or the killer that matches {name} the closest.";

    constructor(clients: BotClients, state: State) {
        super(clients, "killer", ["!killer"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const name = params.join(" ");
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const model = name.length === 0 ? Dbd.randomKiller(language) : Dbd.killer(name, language);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "killer"));
        } else {
            const killer = model as PlayerModel;
            this.respond(channel, userstate, `${DbdUtil.stringify(killer)} @${userstate.username}`);
        }
    }
}

export default KillerCommand;
