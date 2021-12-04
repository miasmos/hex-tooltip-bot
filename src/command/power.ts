import { Language, PowerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class PowerCommand extends Command {
    helpText =
        "!power - Displays a random power. | !power {name} - Displays the {name} power, or the power that matches {name} the closest.";

    constructor(clients: BotClients, state: State) {
        super(clients, "power", ["!power"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const name = params.join(" ");
        const power = name.length === 0 ? Dbd.randomPower(language) : Dbd.power(name, language);
        const killer = name.length > 0 ? Dbd.killer(name, language) : undefined;
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
