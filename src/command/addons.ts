import { ItemModel, Language, ModifierType, PlayerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class AddonsCommand extends Command {
    helpText =
        "!addons {name} - Displays the addons associated with {name}. {name} should be a killer or an item.";

    constructor(clients: BotClients, state: State) {
        super(clients, "addons", ["!addons"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const [name] = params;

        if (!name) {
            this.error(
                channel,
                userstate,
                new BotError(BotErrorMessage.ParamRequired, "a killer or item")
            );
            return;
        }
        const language = this.state.getLanguage(userstate.username) || Language.English;
        const model = Dbd.get(params.join(" "), language);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "player"));
        } else {
            switch (model.modifier) {
                case ModifierType.Player:
                case ModifierType.Item:
                    this.respond(
                        channel,
                        userstate,
                        `${DbdUtil.stringifyModelAddons(model as ItemModel | PlayerModel)} @${
                            userstate.username
                        }`
                    );
                    break;
                default:
                    this.error(
                        channel,
                        userstate,
                        new BotError(`[[${model.name}]] doesn't have any addons.`)
                    );
                    break;
            }
        }
    }
}

export default AddonsCommand;
