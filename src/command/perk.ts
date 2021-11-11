import Dbd from "../dbd";
import { BotError, ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class PerkCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "perk", ["!perk"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const [, ...name] = params;
        const model = Dbd.perk(name.join());

        if (model.isEmpty) {
            this.error(channel, userstate, BotError.PerkNotFound);
        } else {
            this.respond(channel, userstate, `${model.name} | ${model.description}`);
        }
    }
}

export default PerkCommand;
