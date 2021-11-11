import { AnyModel, ModifierType, PlayerType } from "@stephenpoole/deadbydaylight";
import { DbdUtil } from "../dbd";
import { ChatType } from "../enum";
import { BotClients, UserState } from "../types";
import Command from "./command";

class RandomCommand extends Command {
    constructor(clients: BotClients) {
        super(clients, "random", ["!random"], [ChatType.Command, ChatType.Whisper]);
    }

    execute(channel: string, userstate: UserState, params: (string | undefined)[] = []): void {
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
            const model = DbdUtil.random(modifier, player);
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
