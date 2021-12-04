import { Language, PlayerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class PerksCommand extends Command {
    helpText =
        "!perks {name} - Displays the perks associated with {name}. {name} should be a killer or an item.";

    constructor(clients: BotClients, state: State) {
        super(clients, "perks", ["!perks"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const model = Dbd.get(params.join(), language);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "player"));
        } else {
            const player = model as PlayerModel;
            this.respond(
                channel,
                userstate,
                `${DbdUtil.stringifyModelPerks(player)} @${userstate.username}`
            );
        }
    }
}

export default PerksCommand;
