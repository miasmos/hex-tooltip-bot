import { AnyModel, Language, ModifierType, PlayerType } from "@stephenpoole/deadbydaylight";
import { DbdUtil } from "../dbd";
import { ChatType } from "../enum";
import State from "../state";
import { BotClients, UserState } from "../types";
import Command from "./command";

class RandomCommand extends Command {
    helpText =
        "!random - Displays a random Dbd perk, addon, item, killer, survivor, power, or map. | !random {type} - Displays a random {type}. {type} should be one of [survivor|killer|power|item|addon|perk|offering|map|build|loadout]. | !random {type} {count} - Displays {count} random Dbd {type}s. {count} should be a number between 1 and 10. | !random {type} {count} {player}. Displays {count} random Dbd {type}s filtered by {player}. {player} should be one of [survivor|killer].";

    constructor(clients: BotClients, state: State) {
        super(clients, "random", ["!random"], [ChatType.Command, ChatType.Whisper], state);
    }

    execute(channel: string, userstate: UserState, params: (string | undefined)[] = []): void {
        const language = this.state.getLanguage(userstate.username) || Language.English;
        let modifier: ModifierType = ModifierType.None;
        let player: PlayerType = PlayerType.None;
        let count = 1;

        params.forEach(param => {
            if (param === "build" || param === "loadout") {
                modifier = ModifierType.Perk;
                count = 4;
                player = PlayerType.Killer;
                return;
            }

            const m = DbdUtil.getModifier(param!);
            if (m !== ModifierType.None) {
                modifier = m;
                return;
            }

            const p = DbdUtil.getPlayer(param!);
            if (p !== PlayerType.None) {
                player = p;
                return;
            }

            const isNumber = !Number.isNaN(Number(param));
            if (isNumber) {
                count = Number(param);
            }
        });

        if (count > 10) {
            count = 10;
        }

        const models: (AnyModel | undefined)[] = [];
        while (models.length < count) {
            const model = DbdUtil.random(modifier, player, language);
            if (model && !model.isEmpty) {
                const isDuplicate = models.filter(item => item?.name === model.name).length > 0;
                if (!isDuplicate) {
                    models.push(model);
                }
            }
        }

        if (models.length === 1) {
            this.respond(
                channel,
                userstate,
                `${DbdUtil.stringify(models[0] as AnyModel)} @${userstate.username}`
            );
        } else {
            this.respond(
                channel,
                userstate,
                `${DbdUtil.stringifyNames(models)} @${userstate.username}`
            );
        }
    }
}

export default RandomCommand;
