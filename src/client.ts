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
import OfferingCommand from "./command/offering";
import MapCommand from "./command/map";
import PowerCommand from "./command/power";
import RarityCommand from "./command/rarity";
import PerksCommand from "./command/perks";
import AddonsCommand from "./command/addons";
import RandomCommand from "./command/random";
import GetCommand from "./command/get";
import DonateCommand from "./command/donate";
import HelpCommand from "./command/help";
import ChannelsCommand from "./command/channels";
import { TWITCH_CHAT_COLOR, TWITCH_USERNAME, TWITCH_PASSWORD } from "./constants";
import { BotClients } from "./types";
import State from "./state";
import PatchCommand from "./command/patch";

class Client {
    commands: Command[] = [];
    main: tmi.Client;
    group: tmi.Client;
    clients: BotClients;
    state: State = new State();

    constructor() {
        this.initialize();
    }

    async initialize(): Promise<void> {
        await this.state.ready();

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
            this.state.joined().forEach(channel => {
                this.clients.main.join(channel);
            });
        } catch (error) {
            Logger.error(error);
        }
    }

    onConnected(): void {
        this.joinChannels();
        this.clients.main.color(TWITCH_CHAT_COLOR || "GoldenRod");
        this.commands.push(
            new AddonCommand(this.clients),
            new AddonsCommand(this.clients),
            new AllowCommand(this.clients, this.state),
            new BlockCommand(this.clients, this.state),
            new DonateCommand(this.clients),
            new EchoCommand(this.clients),
            new GetCommand(this.clients),
            new HelpCommand(this.clients, this.commands),
            new ItemCommand(this.clients),
            new JoinCommand(this.clients, this.state),
            new KillerCommand(this.clients),
            new LeaveCommand(this.clients, this.state),
            new MapCommand(this.clients),
            new OfferingCommand(this.clients),
            new OwnerCommand(this.clients),
            new PatchCommand(this.clients),
            new PerkCommand(this.clients),
            new PerksCommand(this.clients),
            new PowerCommand(this.clients),
            new RandomCommand(this.clients),
            new RarityCommand(this.clients),
            new SurvivorCommand(this.clients),
            new ChannelsCommand(this.clients, this.state)
        );
    }
}

export default Client;
