import { PlayerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class SurvivorCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "survivor", ["!survivor"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.survivor(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "survivor"));
        } else {
            const survivor = model as PlayerModel;
            this.respond(
                channel,
                userstate,
                `${DbdUtil.stringify(survivor)} @${userstate.username}`
            );
        }
    }
}

export default SurvivorCommand;
