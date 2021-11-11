class Util {
    static stripTags(input = ""): string {
        return input
            .replace(/<\/?[a-zA-Z0-9="\s]+>/g, " ")
            .replace(/\s\./g, ".")
            .replace(/\.([a-zA-Z0-9])/g, ". $1");
    }
}

export default Util;
