import { ChatType, BotErrorMessage } from "../enum";
import BotError from "../error";
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
            // TODO: persist blocked channels
            this.respond(
                channel,
                userstate,
                // eslint-disable-next-line max-len
                `Left @${target}'s channel. I cannot be re-added unless @${target} runs the allow command.`
            );
        } catch (error) {
            this.error(channel, userstate);
        }
    }
}

export default BlockCommand;
