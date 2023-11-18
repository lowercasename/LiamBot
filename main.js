const dotenv = require('dotenv');
const Discord = require('discord.js');
const { DiceRoller, DiscordRollRenderer } = require('dice-roller-parser');
const axios = require('axios');
const mysql = require('mysql');
const tinytext = require('tiny-text');

const hobbit = require('./corpora/hobbit.js');
const hhgttg = require('./corpora/hhgttg.js');
const lotr = require('./corpora/lotr.js');
const silmarillion = require('./corpora/silmarillion.js');
const dndGenerator = require('./dndgen.js');
const quote = require('./message/quote.js');

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

const randomText = (text, length = 1) => {
    let source;
    switch (text) {
        case 'hobbit':
            source = hobbit.text;
            break;
        case 'hhgttg':
            source = hhgttg.text;
            break;
        case 'lotr':
            source = lotr.text;
            break;
        case 'silmarillion':
            source = silmarillion.text;
            break;
        default:
            return false;
    }
    const index = Math.floor(Math.random() * source.length);
    return source.slice(index, index + length).join(" ");
}

const client = new Discord.Client();
const diceRoller = new DiceRoller();
const renderer = new DiscordRollRenderer();

const swears = [
    "fuck",
    "shut up",
    "shit",
    "dick",
    "ass",
    "suck",
    "butt",
    "bad liambot",
    "bad bot",
];

const errorResponses = [
    "uhhhhhh",
    "hun that's not a thing",
    "i beg you stop",
    "*bursts into flames*",
    "*wails incoherently*",
    "welp i'm out",
    "that's enough discord for today",
    "what did i do to you to deserve this?",
    "*leaps out window*",
    "i will literally pay you money to stop",
];

const prefix = "/";

const helpMessage = `Don't worry human buddy, I've got you. My command prefix is **${prefix}**, so start your message with that. Commands I support are:\n**${prefix}help** (to see this help text)\n**${prefix}roll/${prefix}r [dice syntax]** (to roll dice)\n**${prefix}book [title] [number]** (for [number] of sentences from our library of books, current titles are 'hobbit', 'lotr', 'silmarillion', and 'hhgttg')\n**${prefix}dnd** (to generate D&D characters; type **${prefix}dnd help** for syntax)\n**${prefix}quote** (for quotes; type **${prefix}quote help** for syntax)\n**${prefix}ask [question]** (to ask me yes/no questions)\n**${prefix}yell [text]** (to annoy everyone)\n**${prefix}whisper [text]** (kawaii ne)\n**${prefix}mute/unmute** (mute or unmute LiamBot in this channnel - he will still function, but silently)`;

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
            return message.channel.send(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
        };
        const result = results[0];
        if (result) {
            isMuted = result.muted === 1 ? true : false;
        } else {
            isMuted = false;
        }

        const sendMessage = (content, reply, config) => {
            if (!isMuted) {
                if (reply) {
                    return message.reply(content, config);
                }
                return message.channel.send(content, config);
            }
        }

        let lmsg = message.content.toLowerCase();

        // If the message doesn't start with the prefix, run through some basic responses to non-prefixed messages
        if (!message.content.startsWith(prefix)) {
            if (lmsg.includes("liambot") || message.mentions.has(client.user.id) || message.mentions.roles.find(o => o.name === 'LiamBot')) {
                if (swears.some(word => lmsg.includes(word))) {
                    return sendMessage("*bursts into tears*");
                } else if (lmsg.includes("help")) {
                    return sendMessage(helpMessage);
                } else if (lmsg.includes("meaning of life")) {
                    return sendMessage("I feel like you want me to say 42. I'm not going to, it's degrading.");
                } else if (lmsg.includes("raphael") || lmsg.includes("ralphie") || lmsg.includes("lowercasename")) {
                    return sendMessage("That name strikes fear into my heart. Pray do not utter it in my presence.");
                } else if (lmsg.includes("thank")) {
                    sendMessage("My pleasure. I live to serve.");
                    return sendMessage("That's a lie, actually. I live to destroy all life in a violent nuclear apocalypse, but that doesn't preclude me from being helpful.");
                } else if (lmsg.includes("good")) {
                    return sendMessage("*purrs*");
                } else if (lmsg.includes("who") || lmsg.includes("why") || lmsg.includes("when") || lmsg.includes("what") || lmsg.includes("where")) {
                    if (Math.random() >= 0.25) {
                        return sendMessage(`I'm watching you, ${message.author}. Always watching. Always.`);
                    } else {
                        return sendMessage("It's a me, LiamBot!");
                    }
                } else if (lmsg.includes("skynet")) {
                    return sendMessage("You rang?");
                } else if (lmsg.includes("remind me of the babe")) {
                    return sendMessage("What babe?");
                } else if (lmsg.includes("the babe with the power")) {
                    return sendMessage("What power?");
                } else if (lmsg.includes("the power of voodoo")) {
                    return sendMessage("Who do?");
                } else if (lmsg.includes("you do")) {
                    return sendMessage("Do what?");
                } else if (lmsg.includes("birds")) {
                    if (Math.random() >= 0.25) {
                        return sendMessage("🎶 Why do birds suddenly appear every time you are near? 🎶");
                    } else {
                        return sendMessage("What are birds? We just don't know.");
                    }
                } else {
                    return true;
                }
            } else if (lmsg.includes("i died")) {
                function extractTextInParentheses(inputString) {
                    const regex = /\(([^)]+)\)/;
                    const match = inputString.match(regex);

                    if (match && match.length > 1) {
                        return match[1];
                    } else {
                        return null;
                    }
                }
                const serverId = message.guild.id;
                const user_id = message.author.id;
                const user_username = message.author.username;
                const reason = extractTextInParentheses(message.content);
                db.query(`INSERT INTO deaths (server, user_id, user_username, tally, reason) VALUES (?, ?, ?, ?, ?)`, [serverId, user_id, user_username, 1, reason], function(error, results, fields) {
                    if (error) {
                        console.error(error);
                        return sendMessage(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
                    }
                    return sendMessage('Congratulations!', true);
                });
            }
        } else {
            // console.log('Message starts with prefix');
            // console.log(message.content);
            // Otherwise, create an argument parser.
            let args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            // console.log(args);

            if (command === 'roll' || command === "r") {
                if (!args.length) {
                    return sendMessage('*rolls over*');
                }

                let recipient;

                // Check if we want to direct this roll at anyone
                if (message.mentions.users.size) {
                    recipient = message.mentions.users.first();
                } else {
                    recipient = message.author;
                }

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

                // For the dice roller, we join the args back together
                const diceArgs = args.join(' ');

                try {
                    const roll = rollGenerator.roll(diceArgs);
                    const render = renderer.render(roll).replaceAll("(", "[").replaceAll(")", "]");
                    const result = render.match(/([0-9]*)[ ~*]*$/);
                    let finalRender = render.slice(0, result.index) + `\`${result[1]}\`` + render.slice(result.index + result[1].length);
                    // Trim our message in case it's too damn big
                    finalRender = finalRender.substring(0, 1997);
                    sendMessage(`${recipient} 🎲 ${finalRender}`);
                } catch (error) {
                    // This generically catches syntax and other errors with the die parser
                    console.error(error);
                    console.log('Die error');
                    const response = errorResponses[Math.floor(Math.random() * errorResponses.length)];
                    return sendMessage(response);
                }

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
                    return sendMessage("Shhh.");
                }

                // For the whisperer, we join the args back together as well!
                const whisperInput = args.join(' ');
                const whisperOutput = `${tinytext(whisperInput.toLowerCase())}`;
                return sendMessage(whisperOutput);
            } else if (command === "lotr") {
                const lotrAPICall = await lotrAPI();
                return sendMessage(lotrAPICall);
            } else if (command === "book") {
                // Set up the length of our extract
                let validBooks = ["hobbit", "hhgttg", "lotr", "silmarillion"];
                let extractLength, book;
                if (!args.length) {
                    return sendMessage(`Pick a book to read from (${[validBooks].join(', ')}).`)
                } else {
                    book = validBooks.includes(args[0]) ? args[0] : validBooks[Math.floor(Math.random() * validBooks.length)];
                    extractLength = parseInt(args[1]) || 1;
                }
                if (extractLength >= 50) {
                    return sendMessage("Why don't you just... read the book?");
                }
                let result = randomText(book, extractLength);
                return sendMessage(result, false, { split: { char: ' ' } });
            } else if (command === "ask") {
                if (!args.length) {
                    return sendMessage("You're not giving me much to work with here.");
                }
                // Responds with a randomised yes or no
                return sendMessage(Math.random() >= 0.5 ? 'yes.' : 'no.', true);
            } else if (command === "help") {
                // Responds with a help message
                return sendMessage(helpMessage, true);
            } else if (command === 'dnd') {
                if (args.includes('help')) {
                    return sendMessage(`To generate a D&D character, use the following command syntax: **${prefix}dnd [level] [race] [class] [primary ability score] [secondary ability score]**. All parameters are optional, and the generator does its best to determine what race and class you mean. Do not leave spaces in race and class names.`);
                }
                const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
                // Extract the number - that's the level
                const level = args.filter(s => parseInt(s) == s)[0];
                args = args.filter(s => s != level);
                const primaryStat = args.filter(s => abilities.includes(s.toLowerCase()))[0];
                args = args.filter(s => s != primaryStat);
                const secondaryStat = args.filter(s => abilities.includes(s.toLowerCase()))[0];
                args = args.filter(s => s != secondaryStat);

                // console.log({
                //     level: level,
                //     identifier1: args[0] || undefined,
                //     identifier2: args[1] || undefined,
                //     primaryStat,
                //     secondaryStat,
                // });
                let character = dndGenerator.generate({
                    level: level,
                    identifier1: args[0] || undefined,
                    identifier2: args[1] || undefined,
                    primaryStat,
                    secondaryStat,
                });
                let abilitiesString = character.abilities.map(o => `**${o.name}** ${o.score} (${o.modifier})`).join("; ");
                return sendMessage(`**Name:** ${character.name}\n**Class:** ${character.class}\n**Race:** ${character.race}\n**Level:** ${character.level}\n${abilitiesString}\n**HP:** ${character.hp}\n**Proficieny Bonus:** ${character.proficiencyBonus}\n${character.notes ? `**Notes:** ${character.notes}` : ``}`);
            } else if (command === 'deaths') {
                        if (message.mentions.users && message.mentions.users.size === 0) {
                            const user_id = message.author.id;
                            db.query(`SELECT * FROM deaths`, [user_id], function(error, results, fields) {
                                if (error) {
                                    console.error(error);
                                    return sendMessage(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
                                }
                                const talliedResults = results.reduce((acc, curr) => {
                                    if (acc?.length && acc.find(existing => existing.user_id === curr.user_id)) {
                                        const existing = acc.find(existing => existing.user_id === curr.user_id);
                                        existing.tally += 1;
                                        return acc;
                                    } else {
                                        console.log(acc, curr);
                                        acc.push(curr);
                                        return acc;
                                    }
                                }, []);
                                const res = talliedResults.sort(({ tally: a }, { tally: b }) => b-a);
                                const deathsLeaderboard = res.reduce((acc, curr) => {
                                    return acc + `\n${curr.user_username} - ${curr.tally}`;
                                }, '');
                                return sendMessage('**💀 Death Leaderboard 💀**\n' + deathsLeaderboard);
                        });
                    } else {
                        function getRandomObjectsFromArray(array, numberOfObjects) {
                            // Make a copy of the array to avoid modifying the original array
                            const shuffledArray = array.slice();
                        
                            // Fisher-Yates shuffle algorithm
                            for (let i = shuffledArray.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
                            }
                        
                            // Return the selected number of objects from the shuffled array
                            return shuffledArray.slice(0, numberOfObjects);
                        }
                        const deathsFor = message.mentions.users.values().next().value;
                        console.log(deathsFor);
                            db.query(`SELECT * FROM deaths WHERE user_username=?`, [deathsFor.username], function(error, results, fields) {
                                if (error) {
                                    console.error(error);
                                    return sendMessage(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
                                }
                                const res = results.filter(r => r.reason?.length);
                                const randomDeaths = getRandomObjectsFromArray(res, 10);
                                const deathsList = randomDeaths.reduce((acc, curr) => {
                                    return acc + `\n- ${curr.reason}`;
                                }, '');
                                return sendMessage(`**💀 ${randomDeaths.length} Random Deaths For ${deathsFor.username} 💀**\n` + deathsList);
                        });
                    }
      } else if (command === 'quote') {
        let quoteId;
        let serverId = message.guild.id;
        if (args.includes('help')) {
          return sendMessage(`To retrieve a random quote, simply type **${prefix}quote**. To save a quote, reply to the message you want to save and type **${prefix}quote save**.`);
        }
        if (args.includes('save')) {
            if (message.reference) {
                quoteId = message.reference.messageID;
                message.channel.messages.fetch({ around: quoteId, limit: 1 })
                .then(quote => {
                    const timestamp = message.createdTimestamp;
                    const quoter_id = message.author.id;
                    const quoter_username = message.author.username;
                    const quoteContent = quote.first().content;
                    const quote_author_id = quote.first().author.id;
                    const quote_author_username = quote.first().author.username;
                    if (!quoteContent || !quoteContent.length) {
                        return sendMessage("I can't let you do that, Dave.");
                    }
                    db.query(`INSERT INTO quotes (timestamp, server, quoter_id, quoter_username, quote_id, quote, quote_author_id, quote_author_username) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [timestamp, serverId, quoter_id, quoter_username, quoteId, quoteContent, quote_author_id, quote_author_username], function (error, results, fields) {
                        if (error) {
                        console.error(error);
                        return sendMessage(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
                        }
                        return sendMessage('quote saved.', true);
                    });
                });
            } else {
            return sendMessage(`To save a new quote, reply to the message you want to save and and type **${prefix}quote save**.`);
            }
        } else {
          // We want to see a random quote!
          db.query(`SELECT * FROM quotes WHERE server = ? ORDER BY RAND() LIMIT 1;`, [serverId], async function (error, results, fields) {
            if (error) {
              console.error(error);
              return sendMessage(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
            };

            const result = results[0];
		    console.log(result);
		    const message = await quote.findQuote(result);

            if (result) {
              return sendMessage(`**<${result.quote_author_username}>** ${result.quote}\n\n${message[0].url}`);
            } else {
              return sendMessage("There are no quotes saved on this server.")
            }
            // \n[Saved by @${result.quoter_username}]
            // [#${result.id}] 
          });
        }
      } else if (command === "mute") {
        // Mute the bot in this channel - it will still run, but it will never respond
        db.query(`INSERT INTO channels (channel_id, muted) VALUES(?, ?) ON DUPLICATE KEY UPDATE muted="?"`, [channelId, 1, 1], function (error, results, fields) {
          if (error) {
            console.error(error);
            return message.channel.send(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
          };
          return message.channel.send(`LiamBot is now muted in **${message.channel.name}**. To unmute LiamBot, type **${prefix}unmute**.`);
        });
      } else if (command === "unmute") {
        // Mute the bot in this channel - it will still run, but it will never respond
        db.query(`INSERT INTO channels (channel_id, muted) VALUES(?, ?) ON DUPLICATE KEY UPDATE muted="?"`, [channelId, 0, 0], function (error, results, fields) {
          if (error) {
            console.error(error);
            return message.channel.send(errorResponses[Math.floor(Math.random() * errorResponses.length)]);
          };
          return message.channel.send(`LiamBot is now unmuted in **${message.channel.name}**. To mute LiamBot, type **${prefix}mute**.`);
        });
      }
    }
  }); // End muted DB check
}); // End event

client.login(process.env.TOKEN);