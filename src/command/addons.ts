import { ItemModel, ModifierType, PlayerModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class AddonsCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "addons", ["!addons"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.get(params.join(" "));

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "player"));
        } else {
            switch (model.modifier) {
                case ModifierType.Player:
                case ModifierType.Item:
                    this.respond(
                        channel,
                        userstate,
                        `${DbdUtil.stringifyAddons(model as ItemModel | PlayerModel)} @${
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
