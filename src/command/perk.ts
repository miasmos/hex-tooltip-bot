import { Language, PerkModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class PerkCommand extends Command {
    helpText =
        "!perk - Displays a random perk. | !perk {name} - Displays the {name} perk, or the perk that matches {name} the closest.";

    constructor(clients: BotClients, state: State) {
        super(clients, "perk", ["!perk"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const tier = Number.isNaN(Number(params[params.length - 1]))
            ? 3
            : Number(params[params.length - 1]);
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const name = params.join(" ");
        const model = name.length === 0 ? Dbd.randomPerk(language) : Dbd.perk(name, language);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "perk"));
        } else {
            const perk = model as PerkModel;
            perk.setTier(tier);
            this.respond(channel, userstate, `${DbdUtil.stringify(perk)} @${userstate.username}`);
        }
    }
}

export default PerkCommand;
