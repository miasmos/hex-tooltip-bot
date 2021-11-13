import { ChatType, BotErrorMessage, TwitchError } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class JoinCommand extends Command {
    state: State;

    constructor(clients: BotClients, state: State) {
        super(clients, "join", ["!join", "!add"], [ChatType.Command, ChatType.Whisper]);
        this.state = state;
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
            const isBlocked = this.state.isBlocked(target);
            if (isBlocked) {
                this.respond(
                    channel,
                    userstate,
                    `I am blocked from joining @${target} 's channel.`
                );
                return;
            }

            this.state.join(target);
            this.clients.main.join(target);
            this.respond(channel, userstate, `Joined @${target}'s channel.`);
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

export default JoinCommand;
