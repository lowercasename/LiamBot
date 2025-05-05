import 'dotenv/config'
import { Client, GatewayIntentBits, Events } from 'discord.js';
import DiceRoller from '@3d-dice/dice-roller-parser';
import axios from 'axios';
import tinytext from 'tiny-text';

import { sendMessage } from './lib/discord.js';
import { getQuote } from './message/quote.js';
import { getResponse } from './message/namedResponses.js';
import { saveDied, returnDeaths } from './message/deathCounter.js';
import { returnRoll } from './message/roll.js';
import { doDND } from './message/dnd.js';
import { errorResponses, prefix, helpMessage } from './lib/dict.js';
import { returnPassage } from './message/book.js';
import { respondXkcd } from './message/xkcd.js';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Initialize SQLite database connection
const initDb = async () => {
  return await open({
    filename: process.env.DB_PATH,
    driver: sqlite3.Database
  });
};

// Create a database promise
const dbPromise = initDb();

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

const lotrAPI = async () => {
    const response = await axios.get('https://the-one-api.dev/v2/quote', { headers: { 'Authorization': `Bearer ${process.env.LOTR}` } });
    return response.data.docs[Math.floor(Math.random() * response.data.docs.length)].dialog;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const diceRoller = new DiceRoller.DiceRoller();
const renderer = new DiceRoller.DiscordRollRenderer();

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
    // Ignore all messages targeting @everyone or @here or sent by bots
    if (message.content.includes("@here") || message.content.includes("@everyone") || message.author.bot) {
        return false;
    }

    try {
        // Get the database connection
        const db = await dbPromise;

        // Are we muted?
        const channelId = message.channel.id;

        // Check if the channel is muted
        const row = await db.get(`SELECT * FROM channels WHERE channel_id = ?`, channelId);
        const isMuted = row ? row.muted === 1 : false;

        if (isMuted && message.content === `${prefix}unmute`) {
            // Unmute the bot in this channel
            await db.run(
                `INSERT INTO channels (channel_id, muted) VALUES (?, ?)
                 ON CONFLICT(channel_id) DO UPDATE SET muted = ?`,
                [channelId, 0, 0]
            );
            return message.channel.send(`LiamBot is now unmuted in **${message.channel.name}**. To mute LiamBot, type **${prefix}mute**.`);
        } else if (isMuted) {
            return false;
        }

        // If the message doesn't start with the prefix, run through some basic responses to non-prefixed messages
        // or a fun new I died function wow cool
        if (!message.content.startsWith(prefix)) {
            let lmsg = message.content.toLowerCase();
            if (lmsg.includes("liambot") || message.mentions.has(client.user.id) || message.mentions.roles.find(o => o.name === 'LiamBot')) {
                const response = getResponse(lmsg, message.author);
                if (response) {
                    return sendMessage(message, response);
                }
            } else if (lmsg.includes("i died")) {
                return saveDied(message, db, sendMessage);
            }
        } else {
            // Otherwise, create an argument parser.
            let args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

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
                return sendMessage(message, returnRoll(args, recipient, rollGenerator, renderer));

            } else if (command === "yell") {
                if (!args.length) {
                    return sendMessage(message, "Shhh.");
                }

                // For the yeller, we join the args back together as well!
                const yellInput = args.join(' ');
                const yellOutput = `@everyone ${yellInput.toUpperCase()}`;
                return sendMessage(message, yellOutput);
            } else if (command === "whisper") {
                if (!args.length) {
                    return sendMessage(message, "Speak up!");
                }

                // For the whisperer, we join the args back together as well!
                const whisperInput = args.join(' ');
                const whisperOutput = `${tinytext(whisperInput.toLowerCase())}`;
                return sendMessage(message, whisperOutput);
            } else if (command === "lotr") {
                const lotrAPICall = await lotrAPI();
                return sendMessage(message, lotrAPICall);
            } else if (command === "book") {
                let ret = returnPassage(message, args)
                return sendMessage(message, ret[0], ret[1], ret[2]);
            } else if (command === "ask") {
                if (!args.length) {
                    return sendMessage(message, "You're not giving me much to work with here.");
                }
                // Responds with a randomised yes or no
                return sendMessage(message, Math.random() >= 0.5 ? 'yes.' : 'no.', true);
            } else if (command === "help") {
                // Responds with a help message
                return sendMessage(message, helpMessage, true);
            } else if (command === 'dnd') {
                return sendMessage(message, doDND(args));
            } else if (command === 'deaths') {
                return returnDeaths(message, db, sendMessage);
            } else if (command === 'quote') {
                return getQuote(args, message, db, sendMessage);
            } else if (command === 'xkcd') {
                return sendMessage(message, await respondXkcd(args));
            } else if (command === "mute") {
                // Mute the bot in this channel - it will still run, but it will never respond
                await db.run(
                    `INSERT INTO channels (channel_id, muted) VALUES (?, ?)
                     ON CONFLICT(channel_id) DO UPDATE SET muted = ?`,
                    [channelId, 1, 1]
                );
                return message.channel.send(`LiamBot is now muted in **${message.channel.name}**. To unmute LiamBot, type **${prefix}unmute**.`);
            }
        }
    } catch (error) {
        console.error(error);
        return message.channel.send(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
    }
});

client.login(process.env.TOKEN);
