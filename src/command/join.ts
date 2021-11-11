import { ChatType, BotError, TwitchError } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class JoinCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "join", ["!join", "!add"], [ChatType.Command, ChatType.Whisper]);
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
            // TODO: check if we were blocked
            // if (blocked) {
            //     this.respond(
            //         channel,
            //         userstate,
            //         `I am blocked from joining @${target} 's channel.`
            //     );
            //     return;
            // }

            this.clients.main.join(target);
            this.respond(channel, userstate, `Joined @${target} 's channel.`);
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

export default JoinCommand;
