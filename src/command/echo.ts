import { ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class EchoCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "echo", ["!echo", "!say"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        this.respond(
            channel,
            userstate,
            params.reduce((iterator, value) => `${iterator} ${value}`)
        );
    }
}

export default EchoCommand;
