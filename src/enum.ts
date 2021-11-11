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
    None = "",
    PerkNotFound = "That's not a valid perk.",
}

enum TwitchError {
    NoResponse = "No response from Twitch.",
}

export { ChatType, BotError, TwitchError };
