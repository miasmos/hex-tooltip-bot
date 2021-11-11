import { OfferingModel } from "@stephenpoole/deadbydaylight";
import Dbd, { DbdUtil } from "../dbd";
import { BotError, ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class OfferingCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "offering", ["!offering"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.offering(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, BotError.OfferingNotFound);
        } else {
            const offering = model as OfferingModel;
            this.respond(channel, userstate, DbdUtil.stringify(offering));
        }
    }
}

export default OfferingCommand;
