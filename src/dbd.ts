import DeadByDaylight, { PerkModel, AnyModel, ModifierType } from "@stephenpoole/deadbydaylight";
import Util from "./util";

const client = DeadByDaylight();

class DbdUtil {
    static stringifyPerk(model: PerkModel): string {
        return `[[${model.name}]] | T${model.tier} | ${Util.rarity(
            model.rarity
        )} | ${Util.stripTags(model.description)}`;
    }

    static stringify(model: AnyModel): string {
        switch (model.modifier) {
            case ModifierType.Perk:
                return DbdUtil.stringifyPerk(model as PerkModel);
            default:
                return "";
        }
    }
}

export default client;
export { DbdUtil };
