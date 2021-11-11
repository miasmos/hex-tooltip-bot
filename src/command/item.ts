import { ItemModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class ItemCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "item", ["!item"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.item(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "item"));
        } else {
            const item = model as ItemModel;
            this.respond(channel, userstate, `${DbdUtil.stringify(item)} @${userstate.username}`);
        }
    }
}

export default ItemCommand;
