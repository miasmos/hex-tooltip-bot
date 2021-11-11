import { PlayerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class KillerCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "killer", ["!killer"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.killer(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "killer"));
        } else {
            const killer = model as PlayerModel;
            this.respond(channel, userstate, `${DbdUtil.stringify(killer)} @${userstate.username}`);
        }
    }
}

export default KillerCommand;
