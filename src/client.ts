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
import PatchCommand from "./command/patch";
import LanguageCommand from "./command/language";
import { TWITCH_CHAT_COLOR, TWITCH_USERNAME, TWITCH_PASSWORD } from "./constants";
import { BotClients } from "./types";
import State from "./state";

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
            new AddonCommand(this.clients, this.state),
            new AddonsCommand(this.clients, this.state),
            new AllowCommand(this.clients, this.state),
            new BlockCommand(this.clients, this.state),
            new DonateCommand(this.clients, this.state),
            new EchoCommand(this.clients, this.state),
            new GetCommand(this.clients, this.state),
            new HelpCommand(this.clients, this.commands, this.state),
            new ItemCommand(this.clients, this.state),
            new JoinCommand(this.clients, this.state),
            new KillerCommand(this.clients, this.state),
            new LeaveCommand(this.clients, this.state),
            new MapCommand(this.clients, this.state),
            new OfferingCommand(this.clients, this.state),
            new OwnerCommand(this.clients, this.state),
            new PatchCommand(this.clients, this.state),
            new PerkCommand(this.clients, this.state),
            new PerksCommand(this.clients, this.state),
            new PowerCommand(this.clients, this.state),
            new RandomCommand(this.clients, this.state),
            new RarityCommand(this.clients, this.state),
            new SurvivorCommand(this.clients, this.state),
            new ChannelsCommand(this.clients, this.state),
            new LanguageCommand(this.clients, this.state)
        );
    }
}

export default Client;
