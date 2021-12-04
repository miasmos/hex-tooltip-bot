import { AddonModel, AnyModel, Language } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class AddonCommand extends Command {
    helpText =
        "!addon - Displays a random killer addon or item addon. | !addon {name} - Displays the {name} addon, or the addon that matches {name} the closest.";

    constructor(clients: BotClients, state: State) {
        super(clients, "addon", ["!addon"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const name = params.join(" ");
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const model = name.length === 0 ? Dbd.randomAddon(language) : Dbd.addon(name, language);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "addon"));
        } else {
            const addon = model as AddonModel;
            this.respond(
                channel,
                userstate,
                `${DbdUtil.stringify(addon as unknown as AnyModel)} @${userstate.username}`
            );
        }
    }
}

export default AddonCommand;
