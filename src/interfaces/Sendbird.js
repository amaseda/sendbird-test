import SendbirdChat, { LogLevel } from "@sendbird/chat";
import {
    GroupChannelListOrder,
    GroupChannelModule,
} from "@sendbird/chat/groupChannel";

// Constants
const appId = process.env.REACT_APP_SENDBIRD_APP_ID;

class Sendbird {
    constructor() {
        this.initChat();
    }

    async createChannel({ channelUrl, name }) {
        console.log("set params");
        const params = {
            channelUrl,
            name,
            operators: ["123456", "234567"],
        };
        console.log("createChannel params", params);
        this.channel = await this.sb.groupChannel.createChannel(params);
        console.log("this.channel end of setParams", this.channel);
    }

    async initChat() {
        this.sb = SendbirdChat.init({
            appId,
            modules: [new GroupChannelModule()],
        });
        this.sb.logLevel = LogLevel.VERBOSE;
    }

    async enterChat() {
        console.log("channel before enter", this.channel);
        await this.channel.enter();
        console.log("channel after enter", this.channel);
    }

    async initUser() {
        console.log("init user");
        this.user = await this.sb.connect("123456");
    }

    async retrieveChannelList() {
        const params = {
            includeEmpty: true,
            myMemberStateFilter: "all",
            order: GroupChannelListOrder.CHANNEL_NAME_ALPHABETICAL,
            limit: 100,
        };
        const query =
            this.sb.groupChannel.createMyGroupChannelListQuery(params);
        console.log("query", query);

        if (query.hasNext) {
            const channels = await query.next();
            console.log("channels", channels);
        }
    }

    async sendMessage() {
        const params = {
            message: "This is a test message",
        };
        this.channel
            .sendUserMessage(params)
            .onFailed((err, message) => {
                console.error("sendUserMessage error", err);
                console.log("sendUserMessage error msg", message);
            })
            .onSucceeded((message) => {
                console.log("sendUserMessage success", message);
            });
    }
}

export const sendbird = new Sendbird();
