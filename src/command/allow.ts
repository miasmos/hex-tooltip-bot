import { ChatType, BotErrorMessage } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class AllowCommand extends Command {
    helpText =
        "!allow - If blocked, allows me to join the channel again. Only the channel owner can use this command.";

    constructor(clients: BotClients, state: State) {
        super(clients, "allow", ["!allow"], [ChatType.Command, ChatType.Whisper], state);
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
            this.state.unblock(target);
            this.respond(channel, userstate, `I can now join @${target}'s channel. PogChamp`);
        } catch (error) {
            this.error(channel, userstate);
        }
    }
}

export default AllowCommand;
