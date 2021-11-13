enum ChatType {
    Action = "action",
    Chat = "chat",
    Whisper = "whisper",
    Command = "chat",
}

enum BotErrorMessage {
    NotAllowed = "That's not allowed.",
    ChannelNotFound = "Channel not found.",
    MissingChannel = "Channel is required.",
    InvalidChannel = "Invalid channel.",
    ModelNotFound = "That's not a valid $0.",
    ParamRequired = "You need to specify $0.",
    Generic = "An error occurred.",
    None = "",
}

enum BotMessage {
    NoOwner = "$0 has no owner.",
}

enum TwitchError {
    NoResponse = "No response from Twitch.",
}

export { ChatType, BotErrorMessage, BotMessage, TwitchError };
