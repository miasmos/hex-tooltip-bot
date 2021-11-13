import { ItemModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class ItemCommand extends Command {
    helpText =
        "!item - Displays a random item. | !item {name} - Displays the {name} item, or the item that matches {name} the closest.";

    constructor(clients: BotClients) {
        super(clients, "item", ["!item"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const name = params.join(" ");
        const model = name.length === 0 ? Dbd.randomItem() : Dbd.item(name);

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "item"));
        } else {
            const item = model as ItemModel;
            this.respond(channel, userstate, `${DbdUtil.stringify(item)} @${userstate.username}`);
        }
    }
}

export default ItemCommand;
