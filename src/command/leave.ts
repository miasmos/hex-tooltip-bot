import { ChatType, BotErrorMessage, TwitchError } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class LeaveCommand extends Command {
    helpText = "!leave - Leaves a channel. Only the channel owner can use this command.";

    constructor(clients: BotClients, state: State) {
        super(clients, "leave", ["!leave"], [ChatType.Command, ChatType.Whisper], state);
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
        if (userstate.username !== target) {
            this.error(
                channel,
                userstate,
                new BotError(BotErrorMessage.NotAllowed),
                "Only the channel owner is allowed."
            );
            return;
        }

        try {
            this.state.leave(target);
            this.clients.main.part(target);
            this.respond(channel, userstate, `Left @${target}'s channel.`);
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
