import { ChatType } from "../enum";
import State from "../state";
import { BotClients, UserState } from "../types";
import Util from "../util";
import Command from "./command";

class ChannelsCommand extends Command {
    state: State;

    constructor(clients: BotClients, state: State) {
        super(clients, "channels", ["!channels"], [ChatType.Whisper]);
        this.state = state;
    }

    execute(channel: string, userstate: UserState): void {
        try {
            if (!Util.isAdmin(userstate.username)) {
                return;
            }

            this.respond(
                channel,
                userstate,
                `I'm currently in ${this.state.joined().length} channels.`
            );
        } catch (error) {
            this.error(channel, userstate);
        }
    }
}

export default ChannelsCommand;
