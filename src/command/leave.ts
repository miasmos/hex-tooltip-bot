import { ChatType, BotErrorMessage, TwitchError } from "../enum";
import BotError from "../error";
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
            this.error(channel, userstate, new BotError(BotErrorMessage.MissingChannel));
            return;
        }
        if (target.length < 4 || target.length > 25) {
            this.error(channel, userstate, new BotError(BotErrorMessage.InvalidChannel));
            return;
        }

        try {
            this.clients.main.part(target);
            this.respond(channel, userstate, `Left @${target} 's channel.`);
        } catch (error) {
            let message: BotErrorMessage = BotErrorMessage.None;

            switch (error) {
                case TwitchError.NoResponse:
                    message = BotErrorMessage.ChannelNotFound;
                    break;
                default:
                    break;
            }

            this.error(channel, userstate, new BotError(message));
        }
    }
}

export default LeaveCommand;
