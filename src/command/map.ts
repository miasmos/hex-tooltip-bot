import { Language, MapModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class MapCommand extends Command {
    helpText =
        "!map - Displays a random map. | !map {name} - Displays the {name} map, or the map that matches {name} the closest.";

    constructor(clients: BotClients, state: State) {
        super(clients, "map", ["!map"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const name = params.join(" ");
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const model = name.length === 0 ? Dbd.randomMap(language) : Dbd.map(name, language);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "map"));
        } else {
            const map = model as MapModel;
            this.respond(channel, userstate, `${DbdUtil.stringify(map)} @${userstate.username}`);
        }
    }
}

export default MapCommand;
