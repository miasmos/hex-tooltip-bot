import { ChatType, BotError } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class BlockCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "block", ["!block"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        let target;
        if (params.length && !!params[0]) {
            target = params[0] || "";
        } else {
            target = userstate.username;
        }

        if (typeof target === "undefined") {
            this.error(channel, userstate, BotError.MissingChannel);
            return;
        }
        if (target.length < 4 || target.length > 25) {
            this.error(channel, userstate, BotError.InvalidChannel);
            return;
        }
        if (userstate.username !== target) {
            this.error(
                channel,
                userstate,
                BotError.NotAllowed,
                "Only the channel owner is allowed."
            );
            return;
        }

        try {
            // TODO: persist blocked channels
            this.respond(channel, userstate, `Left @${target} 's channel forever. BibleThump`);
        } catch (error) {
            this.error(channel, userstate);
        }
    }
}

export default BlockCommand;
