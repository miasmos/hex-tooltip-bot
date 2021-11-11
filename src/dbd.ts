import DeadByDaylight, {
    PerkModel,
    AnyModel,
    ModifierType,
    Rarity,
    AddonModel,
    ItemModel,
    MapModel,
    OfferingModel,
    PlayerModel,
    PowerModel,
    PlayerType,
    Difficulty,
} from "@stephenpoole/deadbydaylight";
import Util from "./util";

const client = DeadByDaylight();

class DbdUtil {
    static stringifyPerk(model: PerkModel): string {
        return `[[${model.name}]] | T${model.tier} | ${DbdUtil.rarity(model.rarity)} | ${
            model.owner.name || "All"
        } | ${Util.stripTags(model.description)}`;
    }

    static stringifyAddon(model: AddonModel): string {
        return `[[${model.name}]] | ${DbdUtil.rarity(model.rarity)} | ${
            model.owner.name || "All"
        } | ${Util.stripTags(model.description)}`;
    }

    static stringifyItem(model: ItemModel): string {
        return `[[${model.name}]] | ${DbdUtil.rarity(model.rarity)} | ${Util.stripTags(
            model.description
        )}`;
    }

    static stringifyMap(model: MapModel): string {
        return `[[${model.name}]] | ${model.realm?.owner?.name} | ${model.realm}`;
    }

    static stringifyOffering(model: OfferingModel): string {
        return `[[${model.name}]] | ${DbdUtil.rarity(model.rarity)} | ${Util.stripTags(
            model.description
        )}`;
    }

    static stringifyPlayer(model: PlayerModel): string {
        return `[[${model.name}]] | ${DbdUtil.difficulty(model.difficulty)} | ${Util.stripTags(
            model.description
        )}`;
    }

    static stringifyPower(model: PowerModel): string {
        return `[[${model.name}]] | ${model.owner.name} | ${Util.stripTags(model.description)}`;
    }

    static stringifyPerks(model: PlayerModel): string {
        return `[[${model.name}]] | ${model.perks
            .reduce((prev, perk) => `${prev}, [[${perk.name}]]`, "")
            .substring(2)}`;
    }

    static stringifyAddons(model: PlayerModel | ItemModel): string {
        return `[[${model.name}]] | ${model.addons
            .reduce((prev, perk) => `${prev}, [[${perk.name}]]`, "")
            .substring(2)}`;
    }

    static stringify(model: AnyModel): string {
        switch (model.modifier) {
            case ModifierType.Perk:
                return DbdUtil.stringifyPerk(model as PerkModel);
            case ModifierType.Addon:
                return DbdUtil.stringifyAddon(model as unknown as AddonModel);
            case ModifierType.Item:
                return DbdUtil.stringifyItem(model as ItemModel);
            case ModifierType.Map:
                return DbdUtil.stringifyMap(model as MapModel);
            case ModifierType.Offering:
                return DbdUtil.stringifyOffering(model as OfferingModel);
            case ModifierType.Player:
                return DbdUtil.stringifyPlayer(model as PlayerModel);
            case ModifierType.Power:
                return DbdUtil.stringifyPower(model as PowerModel);
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

    static player(player: PlayerType): string {
        switch (player) {
            case PlayerType.Killer:
                return "Killer";
            case PlayerType.Survivor:
                return "Survivor";
            default:
                return "None";
        }
    }

    static difficulty(difficulty: Difficulty): string {
        switch (difficulty) {
            case Difficulty.Easy:
                return "Easy";
            case Difficulty.Hard:
                return "Hard";
            case Difficulty.Intermediate:
                return "Intermediate";
            default:
                return "None";
        }
    }
}

export default client;
export { DbdUtil };
