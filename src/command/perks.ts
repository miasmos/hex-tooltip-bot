import { PlayerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class PerksCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "perks", ["!perks"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.get(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "player"));
        } else {
            const player = model as PlayerModel;
            this.respond(
                channel,
                userstate,
                `${DbdUtil.stringifyPerks(player)} @${userstate.username}`
            );
        }
    }
}

export default PerksCommand;
