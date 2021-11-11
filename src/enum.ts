enum ChatType {
    Action = "action",
    Chat = "chat",
    Whisper = "whisper",
    Command = "chat",
}

enum BotError {
    NotAllowed = "That's not allowed.",
    ChannelNotFound = "Channel not found.",
    MissingChannel = "Channel is required.",
    InvalidChannel = "Invalid channel.",
    KillerNotFound = "That's not a valid killer.",
    SurvivorNotFound = "That's not a valid survivor.",
    PowerNotFound = "That's not a valid power.",
    ItemNotFound = "That's not a valid item.",
    PerkNotFound = "That's not a valid perk.",
    AddonNotFound = "That's not a valid addon.",
    OfferingNotFound = "That's not a valid offering.",
    MapNotFound = "That's not a valid map.",
    NotFound = "That's not a valid thing.",
    Generic = "An error occurred.",
    None = "",
}

enum TwitchError {
    NoResponse = "No response from Twitch.",
}

export { ChatType, BotError, TwitchError };
