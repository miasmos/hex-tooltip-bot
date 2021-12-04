/* eslint-disable no-undef */
import { Language } from "@stephenpoole/deadbydaylight";
import tmi from "tmi.js";
import { ChatType } from "./enum";

interface BotClients {
    main: tmi.Client;
    group: tmi.Client;
}

interface UserState {
    username: string;
    messageType: ChatType;
    mod: boolean;
}

interface AppState {
    [key: string]: unknown;
    block: string[];
    joined: string[];
    language: { [key: string]: Language };
}

export { BotClients, UserState, AppState };
