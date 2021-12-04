import { DbdUtil } from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class LanguageCommand extends Command {
    helpText =
        "!language {name} - Change my language in your chat. Only the channel owner can use this command. {name} should be one of [en|es|de|fr|it|jp|ko|pl|ru|th|tr|zh].";

    constructor(clients: BotClients, state: State) {
        super(clients, "language", ["!language"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const [languageParam] = params;
        const language = DbdUtil.getLanguage(languageParam);

        if (!language) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "language"));
            return;
        }

        this.state.setLanguage(userstate.username, language!);
        this.respond(
            channel,
            userstate,
            `My language is now set to ${language} in your chat. @${userstate.username}`
        );
    }
}

export default LanguageCommand;
