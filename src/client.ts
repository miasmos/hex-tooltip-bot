import tmi from "tmi.js";
import Logger from "./logger";
import Command from "./command/command";
import AllowCommand from "./command/allow";
import BlockCommand from "./command/block";
import EchoCommand from "./command/echo";
import JoinCommand from "./command/join";
import LeaveCommand from "./command/leave";
import PerkCommand from "./command/perk";
import OwnerCommand from "./command/owner";
import AddonCommand from "./command/addon";
import ItemCommand from "./command/item";
import KillerCommand from "./command/killer";
import SurvivorCommand from "./command/survivor";
import MapCommand from "./command/map";
import PowerCommand from "./command/power";
import RarityCommand from "./command/rarity";
import PerksCommand from "./command/perks";
import AddonsCommand from "./command/addons";
import RandomCommand from "./command/random";
import { TWITCH_CHAT_COLOR, TWITCH_USERNAME, TWITCH_PASSWORD } from "./constants";
import { BotClients } from "./types";

class Client {
    commands: Command[] = [];
    main: tmi.Client;
    group: tmi.Client;
    clients: BotClients;

    constructor() {
        this.initialize();
    }

    async initialize(): Promise<void> {
        this.main = new tmi.Client({
            options: {
                debug: process.env.NODE_ENV === "development",
            },
            connection: {
                reconnect: true,
            },
            identity: {
                username: TWITCH_USERNAME,
                password: TWITCH_PASSWORD,
            },
            channels: [TWITCH_USERNAME!],
        });

        this.group = new tmi.Client({
            options: {
                debug: process.env.NODE_ENV === "development",
            },
            connection: {
                reconnect: true,
            },
            identity: {
                username: TWITCH_USERNAME,
                password: TWITCH_PASSWORD,
            },
        });

        this.main.on("connected", this.onConnected.bind(this));
        this.clients = { main: this.main, group: this.group };
        await Promise.all([this.main.connect(), this.group.connect()]);
    }

    async joinChannels(): Promise<void> {
        try {
            const channels: string[] = [];
            // TODO: persist current channels

            channels.forEach(value => {
                // if (!value.blocked && value.join) {
                // this.clients.main.join(value.channel);
                // }
            });
        } catch (error) {
            Logger.error(error);
        }
    }

    onConnected(): void {
        this.joinChannels();
        this.clients.main.color(TWITCH_CHAT_COLOR || "GoldenRod");
        this.commands.push(
            new JoinCommand(this.clients),
            new EchoCommand(this.clients),
            new LeaveCommand(this.clients),
            new BlockCommand(this.clients),
            new AllowCommand(this.clients),
            new PerkCommand(this.clients),
            new OwnerCommand(this.clients),
            new AddonCommand(this.clients),
            new ItemCommand(this.clients),
            new KillerCommand(this.clients),
            new SurvivorCommand(this.clients),
            new MapCommand(this.clients),
            new PowerCommand(this.clients),
            new RarityCommand(this.clients),
            new PerksCommand(this.clients),
            new AddonsCommand(this.clients),
            new RandomCommand(this.clients)
        );
    }
}

export default Client;
