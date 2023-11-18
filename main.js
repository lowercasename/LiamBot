const dotenv = require('dotenv');
const Discord = require('discord.js');
const { DiceRoller, DiscordRollRenderer } = require('dice-roller-parser');
const axios = require('axios');
const mysql = require('mysql');
const tinytext = require('tiny-text');

const quote = require('./message/quote.js');
const namedResponses = require('./message/namedResponses.js');
const deathCounter = require('./message/deathCounter.js');
const roll = require('./message/roll.js');
const dnd = require('./message/dnd.js');
const dict = require('./dict.js');

dotenv.config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'liambot',
    password: process.env.MYSQL,
    database: 'liambot'
});

db.connect();

const suckOnThisANU = () => {
    return axios.get(`https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint16`)
        .then(response => {
            return response.data.data[0] / 65535;
        });
}

const weightedRandom = (weight) => {
    weight = parseFloat(weight);
    if (weight >= 1) {
        weight = 1;
    }
    const generated = Math.random() + weight;
    if (generated > 1) {
        return 0.9999999999999999;
    } else {
        return generated;
    }
}

const lotrAPI = () => {
    return axios.get('https://the-one-api.dev/v2/quote', { headers: { 'Authorization': `Bearer ${process.env.LOTR}` } })
        .then(response => {
            return response.data.docs[Math.floor(Math.random() * response.data.docs.length)].dialog;
        })
}

const client = new Discord.Client();
const diceRoller = new DiceRoller();
const renderer = new DiscordRollRenderer();

client.on('ready', async() => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    // Ignore all messages targeting @everyone or @here or sent by bots
    if (message.content.includes("@here") || message.content.includes("@everyone") || message.author.bot) {
        return false;
    }

    // Are we muted?
    const channelId = message.channel.id;
    let isMuted;
    db.query(`SELECT * FROM channels WHERE channel_id = ?;`, [channelId], async function(error, results, fields) {
        if (error) {
            console.error(error);
            console.log('Database error');
            return message.channel.send(dict.errorResponses[Math.floor(Math.random() * dict.errorResponses.length)]);
        };
        const result = results[0];
        if (result) {
            isMuted = result.muted === 1 ? true : false;
        } else {
            isMuted = false;
        }

        if(!isMuted) {

            const sendMessage = (content, reply, config) => {
                if (reply) {
                    return message.reply(content, config);
                }
                return message.channel.send(content, config);
            }

            // If the message doesn't start with the prefix, run through some basic responses to non-prefixed messages
            // or a fun new I died function wow cool
            if (!message.content.startsWith(dict.prefix)) {
                let lmsg = message.content.toLowerCase();
                if (lmsg.includes("liambot") || message.mentions.has(client.user.id) || message.mentions.roles.find(o => o.name === 'LiamBot')) {
                    return sendMessage(namedResponses.getResponse(lmsg, message.author));
                } else if (lmsg.includes("i died")) {
                    let ret = deathCounter.saveDied(message, db);
                    return sendMessage(ret[0], ret[1]);
                }
            } else {
                // Otherwise, create an argument parser.
                let args = message.content.slice(dict.prefix.length).trim().split(/ +/);
                const command = args.shift().toLowerCase();
    
                // console.log(args);
        
                let recipient;
                
                // Check if we want to direct this at anyone
                if (message.mentions.users.size) {
                    recipient = message.mentions.users.first();
                } else {
                    recipient = message.author;
                }
    
                if (command === 'roll' || command === "r") {
                    let rollGenerator;
                    // Check if this is a weighted roll
                    if (args.some(arg => arg.startsWith('w'))) {
                        const weight = args.find(arg => arg.startsWith('w')).slice(1);
                        // Remove the weighting index so we don't confuse the die roller
                        args = args.filter(arg => !arg.startsWith('w'));
                        rollGenerator = new DiceRoller(() => weightedRandom(weight));
                    } else {
                        rollGenerator = diceRoller;
                    }
                    return sendMessage(roll.returnRoll(args, recipient, rollGenerator, renderer));
    
                } else if (command === "yell") {
                    if (!args.length) {
                        return sendMessage("Shhh.");
                    }
    
                    // For the yeller, we join the args back together as well!
                    const yellInput = args.join(' ');
                    const yellOutput = `@everyone ${yellInput.toUpperCase()}`;
                    return sendMessage(yellOutput);
                } else if (command === "whisper") {
                    if (!args.length) {
                        return sendMessage("Speak up!");
                    }
    
                    // For the whisperer, we join the args back together as well!
                    const whisperInput = args.join(' ');
                    const whisperOutput = `${tinytext(whisperInput.toLowerCase())}`;
                    return sendMessage(whisperOutput);
                } else if (command === "lotr") {
                    const lotrAPICall = await lotrAPI();
                    return sendMessage(lotrAPICall);
                } else if (command === "book") {
                    let ret = book.returnPassage(args)
                    return sendMessage(ret[0],ret[1],ret[2]);
                } else if (command === "ask") {
                    if (!args.length) {
                        return sendMessage("You're not giving me much to work with here.");
                    }
                    // Responds with a randomised yes or no
                    return sendMessage(Math.random() >= 0.5 ? 'yes.' : 'no.', true);
                } else if (command === "help") {
                    // Responds with a help message
                    return sendMessage(dict.helpMessage, true);
                } else if (command === 'dnd') {
                    return sendMessage(dnd.doDND(args));
                } else if (command === 'deaths') {
                    return sendMessage(deathCounter.returnDeaths(message, db));
                } else if (command === 'quote') {
                    let ret = quote.getQuote(args, message, db);
                    return sendMessage(ret[0],ret[1]);
                } else if (command === "mute") {
                    // Mute the bot in this channel - it will still run, but it will never respond
                    db.query(`INSERT INTO channels (channel_id, muted) VALUES(?, ?) ON DUPLICATE KEY UPDATE muted="?"`, [channelId, 1, 1], function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        return message.channel.send(dict.errorResponses[Math.floor(Math.random() * dict.errorResponses.length)]);
                    };
                        return message.channel.send(`LiamBot is now muted in **${message.channel.name}**. To unmute LiamBot, type **${dict.prefix}unmute**.`);
                    });
                } else if (command === "unmute") {
                    // Mute the bot in this channel - it will still run, but it will never respond
                    db.query(`INSERT INTO channels (channel_id, muted) VALUES(?, ?) ON DUPLICATE KEY UPDATE muted="?"`, [channelId, 0, 0], function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        return message.channel.send(dict.errorResponses[Math.floor(Math.random() * dict.errorResponses.length)]);
                    };
                    return message.channel.send(`LiamBot is now unmuted in **${message.channel.name}**. To mute LiamBot, type **${dict.prefix}mute**.`);
                    });
                }
            }
        }
    }); // End muted DB check
}); // End event

client.login(process.env.TOKEN);