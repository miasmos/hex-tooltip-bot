import tmi from "tmi.js";
import Twitch from "./api/twitch";
import Logger from "./logger";
import Command from "./command/command";
import AllowCommand from "./command/allow";
import BlockCommand from "./command/block";
import EchoCommand from "./command/echo";
import JoinCommand from "./command/join";
import LeaveCommand from "./command/leave";
import PerkCommand from "./command/perk";
import { TWITCH_CLIENT_ID, TWITCH_USERNAME, TWITCH_CHANNEL } from "./constants";
import { BotClients } from "./types";

class Client {
    logger = new Logger();
    commands: Command[] = [];
    main: tmi.Client;
    group: tmi.Client;

    clients: BotClients;

    constructor() {
        this.initialize();
    }

    async initialize(): Promise<void> {
        const token = await Twitch.bearerToken();

        this.main = new tmi.Client({
            options: {
                debug: process.env.NODE_ENV === "development",
                clientId: TWITCH_CLIENT_ID,
            },
            connection: {
                reconnect: true,
            },
            identity: {
                username: TWITCH_USERNAME,
                password: `oauth:${token}`,
            },
            channels: [`#${TWITCH_CHANNEL}`],
        });

        this.group = new tmi.Client({
            options: {
                debug: process.env.NODE_ENV === "development",
                clientId: TWITCH_CLIENT_ID,
            },
            connection: {
                reconnect: true,
            },
            identity: {
                username: TWITCH_USERNAME,
                password: `oauth:${token}`,
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
            this.logger.error(error);
        }
    }

    onConnected(): void {
        this.joinChannels();
        this.clients.main.color("Red");
        this.commands.push(
            new JoinCommand(this.clients),
            new EchoCommand(this.clients),
            new LeaveCommand(this.clients),
            new BlockCommand(this.clients),
            new AllowCommand(this.clients),
            new PerkCommand(this.clients)
        );
    }
}

export default Client;
