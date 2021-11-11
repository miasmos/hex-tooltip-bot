import { PerkModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotError, ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class PerkCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "perk", ["!perk"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const tier = Number.isNaN(params[params.length - 1])
            ? 3
            : Number(params[params.length - 1]);
        const model = Dbd.perk(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, BotError.PerkNotFound);
        } else {
            const perk = model as PerkModel;
            perk.setTier(tier);
            this.respond(channel, userstate, DbdUtil.stringify(perk));
        }
    }
}

export default PerkCommand;
