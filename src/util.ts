class Util {
    static stripTags(input = ""): string {
        return input
            .replace(/<\/?[a-zA-Z0-9="\s]+>/g, " ")
            .replace(/\s(\.|,)/g, "$1")
            .replace(/(\.|,)([a-zA-Z0-9])/g, "$1 $2");
    }
}

export default Util;
