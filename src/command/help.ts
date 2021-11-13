import { ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class HelpCommand extends Command {
    commands: Command[];
    helpText = "Very funny.";

    constructor(clients: BotClients, commands: Command[]) {
        super(clients, "help", ["!help"], [ChatType.Command, ChatType.Whisper]);
        this.commands = commands;
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const [name] = params;

        if (!name) {
            const commands = this.commands
                .reduce((prev, current) => `${prev}, !${current.name}`, "")
                .substring(2);
            this.respond(
                channel,
                userstate,
                `Use !help {command}, available commands: ${commands} @${userstate.username}`
            );
            return;
        }

        for (let i = 0; i < this.commands.length; i += 1) {
            const command = this.commands[i];
            if (command.name === name && command.helpText.length > 0) {
                this.respond(channel, userstate, `${command.helpText} @${userstate.username}`);
            }
        }
    }
}

export default HelpCommand;