import { PerkModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class PerkCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "perk", ["!perk"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const tier = Number.isNaN(Number(params[params.length - 1]))
            ? 3
            : Number(params[params.length - 1]);
        const name = params.join(" ");
        const model = name.length === 0 ? Dbd.randomPerk() : Dbd.perk(name);

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
