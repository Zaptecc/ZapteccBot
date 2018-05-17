var config = require("./config.json");

var tmi = require('tmi.js');

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "ZapteccBot",
        password: config.password
    },
    channels: ["Zaptecc"]
};

var client = new tmi.client(options);
client.connect();

client.on('connected', function(address, port) {
    console.log("Address: " + address + ", Port: " + port);
    client.action("Zaptecc", "Connected to chat!")
});

client.on('chat', function(channel, user, message, self) {
    client.action("Zaptecc", user['display-name'] + " you rang?")
})