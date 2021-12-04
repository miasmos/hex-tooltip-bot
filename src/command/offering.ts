import { Language, OfferingModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class OfferingCommand extends Command {
    helpText =
        "!offering - Displays a random offering. | !offering {name} - Displays the {name} offering, or the offering that matches {name} the closest.";

    constructor(clients: BotClients, state: State) {
        super(clients, "offering", ["!offering"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const name = params.join(" ");
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const model =
            name.length === 0 ? Dbd.randomOffering(language) : Dbd.offering(name, language);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "offering"));
        } else {
            const offering = model as OfferingModel;
            this.respond(
                channel,
                userstate,
                `${DbdUtil.stringify(offering)} @${userstate.username}`
            );
        }
    }
}

export default OfferingCommand;
