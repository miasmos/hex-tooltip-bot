import Dbd from "../dbd";
import { BotErrorMessage, ChatType } from "../enum";
import BotError from "../error";
import { BotClients, UserState } from "../types";
import Command from "./command";

class OwnerCommand extends Command {
    helpText =
        "!owner {name} - Displays the owner of {name}. {name} should be a perk, power, addon or map.";

    constructor(clients: BotClients) {
        super(clients, "owner", ["!owner"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: string[] = []): void {
        const [name] = params;

        if (!name) {
            this.error(
                channel,
                userstate,
                new BotError(BotErrorMessage.ParamRequired, "a perk, power, addon, or map")
            );
            return;
        }
        const model = Dbd.get(params.join());

        if (!model || model.isEmpty) {
            this.error(channel, userstate, new BotError(BotErrorMessage.ModelNotFound, "thing"));
        } else if ("owner" in model && !!model.owner.name) {
            this.respond(
                channel,
                userstate,
                `[[${model.name}]] is owned by [[${model.owner.name}]] @${userstate.username}`
            );
        } else {
            this.respond(
                channel,
                userstate,
                `[[${model.name}]] has no owner @${userstate.username}`
            );
        }
    }
}

export default OwnerCommand;
