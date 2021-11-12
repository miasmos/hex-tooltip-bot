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
    static stringifyNames(models: (AnyModel | undefined)[]): string {
        return models
            .reduce((prev, model) => {
                if (!model) {
                    return prev;
                }
                return `${prev}, [[${model.name}]]`;
            }, "")
            .substring(2);
    }

    static stringifyPerk(model: PerkModel): string {
        return `[[${model.name} ${model.tier}]] | ${DbdUtil.rarity(model.rarity)} | ${
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
        return `[[${model.name}]] | [[${model.realm?.owner?.name}]] | [[${model.realm.name}]]`;
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
        return `[[${model.name}]] | [[${model.owner.name}]] | ${Util.stripTags(model.description)}`;
    }

    static stringifyModelPerks(model: PlayerModel): string {
        return `[[${model.name}]] | ${model.perks
            .reduce((prev, perk) => `${prev}, [[${perk.name}]]`, "")
            .substring(2)}`;
    }

    static stringifyModelAddons(model: PlayerModel | ItemModel): string {
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

    static getModifier(modifier: string): ModifierType {
        const lower = modifier.toLowerCase();
        switch (lower) {
            case "power":
                return ModifierType.Power;
            case "item":
                return ModifierType.Item;
            case "addon":
                return ModifierType.Addon;
            case "offering":
                return ModifierType.Offering;
            case "perk":
                return ModifierType.Perk;
            case "player":
                return ModifierType.Player;
            case "map":
                return ModifierType.Map;
            default:
                return ModifierType.None;
        }
    }

    static getPlayer(player: string): PlayerType {
        const lower = player.toLowerCase();
        switch (lower) {
            case "killer":
                return PlayerType.Killer;
            case "survivor":
                return PlayerType.Survivor;
            default:
                return PlayerType.None;
        }
    }

    static random(modifier: ModifierType, player?: PlayerType): AnyModel | undefined {
        switch (modifier as unknown as ModifierType) {
            case ModifierType.Addon: {
                if (player === PlayerType.Killer) {
                    return client.randomKillerAddon() as unknown as AnyModel;
                }
                if (player === PlayerType.Survivor) {
                    return client.randomSurvivorAddon() as unknown as AnyModel;
                }
                return client.randomAddon() as unknown as AnyModel;
            }
            case ModifierType.Item:
                return client.randomItem();
            case ModifierType.Map:
                return client.randomMap();
            case ModifierType.Offering: {
                if (player === PlayerType.Killer) {
                    return client.randomKillerOffering();
                }
                if (player === PlayerType.Survivor) {
                    return client.randomSurvivorOffering();
                }
                return client.randomOffering();
            }
            case ModifierType.Perk: {
                if (player === PlayerType.Killer) {
                    return client.randomKillerPerk();
                }
                if (player === PlayerType.Survivor) {
                    return client.randomSurvivorPerk();
                }
                return client.randomPerk();
            }
            case ModifierType.Player: {
                if (player === PlayerType.Killer) {
                    return client.randomKiller();
                }
                if (player === PlayerType.Survivor) {
                    return client.randomSurvivor();
                }
                return client.randomPlayer();
            }
            case ModifierType.Power:
                return client.randomPower();
            default: {
                if (player === PlayerType.Killer) {
                    return client.randomKiller();
                }
                if (player === PlayerType.Survivor) {
                    return client.randomSurvivor();
                }
                return client.random([], []);
            }
        }
    }
}

export default client;
export { DbdUtil };
