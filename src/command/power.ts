import { PowerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class PowerCommand extends Command {
    helpText =
        "!power - Displays a random power. | !power {name} - Displays the {name} power, or the power that matches {name} the closest.";

    constructor(clients: BotClients) {
        super(clients, "power", ["!power"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const name = params.join(" ");
        const model = name.length === 0 ? Dbd.randomPower() : Dbd.power(name);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "power"));
        } else {
            const power = model as PowerModel;
            this.respond(channel, userstate, `${DbdUtil.stringify(power)} @${userstate.username}`);
        }
    }
}

export default PowerCommand;
