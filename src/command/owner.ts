import Dbd, { DbdUtil } from "../dbd";
import Util from "../util";
import { BotError, ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class OwnerCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "owner", ["!owner"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const model = Dbd.get(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, BotError.NotFound);
        } else {
            this.respond(channel, userstate, DbdUtil.stringify(model));
        }
    }
}

export default OwnerCommand;
