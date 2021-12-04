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
        const power = name.length === 0 ? Dbd.randomPower() : Dbd.power(name);
        const killer = name.length > 0 ? Dbd.killer(name) : undefined;
        const hasPower = power && !power.isEmpty;
        const hasKiller = killer && !killer.isEmpty;

        if (!hasPower && !hasKiller) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "power"));
            return;
        }

        if (hasKiller) {
            this.respond(
                channel,
                userstate,
                `${DbdUtil.stringify(killer?.power as PowerModel)} @${userstate.username}`
            );
            return;
        }

        this.respond(
            channel,
            userstate,
            `${DbdUtil.stringify(power as PowerModel)} @${userstate.username}`
        );
    }
}

export default PowerCommand;
