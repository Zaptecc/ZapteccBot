const config = require("./config.json");

const tmi = require('tmi.js');
const discord = require('discord.js');
const discordClient = new discord.Client;

const options = {
    options: {
        //debug: true
    },
    identity: {
        username: "ZapteccBot",
        password: config.twitchPassword
    },
    channels: [
        "Zaptecc"
    ]
};

discordClient.login(config.discordToken);

            //TWITCH BELOW

const twitchClient = new tmi.client(options);

twitchClient.on('message', onMessageHandler);
twitchClient.on('connected', onConnectedHandler);

twitchClient.connect();

function onMessageHandler (channel, user, msg, self) {
    if (self) { return; } // Ignore messages from the bot
  
    //const channel = discordClient.channels.fetch('446713147068514304');
    //channel.say(msg.user + ': ' + msg);

    console.log('**NEW MESSAGE** : [' + user['display-name'] + '] - ' + msg);

  }

function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
    twitchClient.action("Zaptecc", "Connected to chat!");
}

             //DISCORD BELOW

discordClient.on('ready', () => {
    console.log(`Logged in to Discord as ${discordClient.user.tag}!`);
});