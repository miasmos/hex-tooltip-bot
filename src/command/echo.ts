import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class EchoCommand extends Command {
    helpText = "!echo {message} - Copies {message} and puts it in chat.";

    constructor(clients: BotClients, state: State) {
        super(clients, "echo", ["!echo", "!say"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        if (params.length === 0) {
            this.error(
                channel,
                userstate,
                new BotError(BotErrorMessage.ParamRequired, "a message")
            );
            return;
        }

        this.respond(
            channel,
            userstate,
            params.reduce((iterator, value) => `${iterator} ${value}`)
        );
    }
}

export default EchoCommand;
