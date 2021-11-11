import DeadByDaylight, {
    PerkModel,
    AnyModel,
    ModifierType,
    Rarity,
} from "@stephenpoole/deadbydaylight";
import Util from "./util";

const client = DeadByDaylight();

class DbdUtil {
    static stringifyPerk(model: PerkModel): string {
        return `[[${model.name}]] | T${model.tier} | ${DbdUtil.rarity(model.rarity)} | ${
            model.owner.name || "All"
        } | ${Util.stripTags(model.description)}`;
    }

    static stringify(model: AnyModel): string {
        switch (model.modifier) {
            case ModifierType.Perk:
                return DbdUtil.stringifyPerk(model as PerkModel);
            default:
                return "";
        }
    }

    static rarity(rarity: Rarity): string {
        switch (rarity) {
            case Rarity.Common:
                return "Common";
            case Rarity.Event:
                return "Event";
            case Rarity.Rare:
                return "Rare";
            case Rarity.UltraRare:
                return "Ultra Rare";
            case Rarity.Uncommon:
                return "Uncommon";
            case Rarity.VeryRare:
                return "Very Rare";
            default:
                return "None";
        }
    }
}

export default client;
export { DbdUtil };
