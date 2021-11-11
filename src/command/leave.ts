import { ChatType, BotError, TwitchError } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class LeaveCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "leave", ["!leave"], [ChatType.Command, ChatType.Whisper]);
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

        try {
            this.clients.main.part(target);
            this.respond(channel, userstate, `Left @${target} 's channel.`);
        } catch (error) {
            let message: BotError = BotError.None;

            switch (error) {
                case TwitchError.NoResponse:
                    message = BotError.ChannelNotFound;
                    break;
                default:
                    break;
            }

            this.error(channel, userstate, message);
        }
    }
}

export default LeaveCommand;
