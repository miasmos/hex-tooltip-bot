import { OfferingModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class OfferingCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "offering", ["!offering"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.offering(params.join());

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
