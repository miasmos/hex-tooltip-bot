import { ModifierType, PerkModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class RarityCommand extends Command {
    helpText =
        "!rarity {name} - Displays the rarity of {name}. {name} should be a perk, offering, or addon.";

    constructor(clients: BotClients) {
        super(clients, "rarity", ["!rarity"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const [name] = params;

        if (!name) {
            this.error(
                channel,
                userstate,
                new BotError(BotErrorMessage.ParamRequired, "a perk, offering, or addon")
            );
            return;
        }

        const tier = Number.isNaN(Number(params[params.length - 1]))
            ? 3
            : Number(params[params.length - 1]);
        const model = Dbd.get(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "thing"));
        } else if ("rarity" in model) {
            let name = model.name;
            switch (model.modifier) {
                case ModifierType.Perk:
                    (model as PerkModel).setTier(tier);
                    name = `${model.name} ${tier}`;
                default:
                    break;
            }

            this.respond(
                channel,
                userstate,
                `[[${name}]] is ${DbdUtil.rarity(model.rarity)} @${userstate.username}`
            );
        } else {
            this.respond(channel, userstate, `[[${model.name}]] has no rarity.`);
        }
    }
}

export default RarityCommand;
