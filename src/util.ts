import { Rarity } from "@stephenpoole/deadbydaylight";

class Util {
    static stripTags(input = ""): string {
        return input
            .replace(/<\/?[a-zA-Z0-9="\s]+>/g, " ")
            .replace(/\s\./g, ".")
            .replace(/\.([a-zA-Z0-9])/g, ". $1");
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

export default Util;
