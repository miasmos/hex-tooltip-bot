import { PlayerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class SurvivorCommand extends Command {
    helpText =
        "!survivor - Displays a random survivor. | !survivor {name} - Displays the {name} survivor, or the survivor that matches {name} the closest.";

    constructor(clients: BotClients) {
        super(clients, "survivor", ["!survivor"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const name = params.join(" ");
        const model = name.length === 0 ? Dbd.randomSurvivor() : Dbd.survivor(name);

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
