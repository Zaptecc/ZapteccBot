const config = require("./config.json");

const twitchOptions = {
    options: {
        //debug: true
    },
    identity: {
        username: "ZapteccBot",
        password: config.twitchPassword
    },
    channels: ["Zaptecc"]
};

const tmi = require('tmi.js');
const twitchClient = new tmi.client(twitchOptions);
const discord = require('discord.js');
const discordClient = new discord.Client;

discordClient.login(config.discordToken);

twitchClient.on('message', onMessageHandler);
twitchClient.on('connected', onConnectedHandler);

twitchClient.connect();

function onMessageHandler (channel, user, msg, self) {
    if (self) {return;} // Ignore messages from the bot
    
    const discordChannel = discordClient.channels.cache.get('446713147068514304');
    if (!discordChannel) return;


    if (msg.startsWith('!')) {
        if (msg == '!hello') {
            twitchClient.say("Zaptecc", "Hello world!");
            console.log(user['display-name'] + ' ran command hello');
        };

        return;
    };

    discordChannel.send(`[` + user['display-name'] + '] - ' + msg);

    console.log('Twitch Message : [' + user['display-name'] + '] - ' + msg);
        
  };

function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    twitchClient.action("Zaptecc", "Connected to chat!");
};

discordClient.on('ready', () => {
    console.log(`Logged in to Discord as ${discordClient.user.tag}!`);
    discordClient.user.setActivity("twitch.tv/Zaptecc", {
        type: "WATCHING",
        url: "https://www.twitch.tv/Zaptecc"
      });
});

discordClient.on('message', (message) => {

    if (message.channel.id !== '446713147068514304') {return;}

    const msgAuthor = message.author.username;
    const msgAuthorID = message.author.id;
    if (msgAuthorID == '449778211912417281') {return;}

    if (message.content.indexOf('!') == 0) {

    };

    twitchClient.say("Zaptecc", "Discord Message: [" + msgAuthor + "] - " + message.content);

    console.log('Discord Message: [' + msgAuthor + '] - ' + message.content);
});