import { AddonModel, AnyModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class AddonCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "addon", ["!addon"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.addon(params.join());

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
