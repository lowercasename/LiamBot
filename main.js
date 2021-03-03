const dotenv = require('dotenv');
const Discord = require('discord.js');
const { DiceRoller, DiscordRollRenderer } = require('dice-roller-parser');
const axios = require('axios');
const tinytext = require('tiny-text');

const hobbit = require('./corpora/hobbit.js');
const hhgttg = require('./corpora/hhgttg.js');
const dndGenerator = require('./dndgen.js');

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

const lotr = () => {
  return axios.get('https://the-one-api.dev/v2/quote', { headers: { 'Authorization': `Bearer ${process.env.LOTR}`}})
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
    case 'hhggtg':
      source = hhgttg.text;
      break;
    default:
      return false;
  }
  const index = Math.floor(Math.random() * source.length);
  return source.slice(index, index + length).join(" ");
}

dotenv.config();
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

const prefix = "$";

const helpMessage = `Don't worry human buddy, I've got you. My command prefix is **${prefix}**, so start your message with that. Commands I support are:\n**${prefix}help** (to see this help text)\n**${prefix}roll/${prefix}r [dice syntax]** (to roll dice)\n**${prefix}hobbit [number]** (for [number] random sentences from _The Hobbit_, default 1)\n**${prefix}dnd** (to generate D&D characters; type **${prefix}dnd help** for syntax)\n**${prefix}ask [question]** (to ask me yes/no questions)\n**${prefix}yell [text]** (to annoy everyone)`;

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  // Ignore all messages targeting @everyone or @here or sent by bots
  if (message.content.includes("@here") || message.content.includes("@everyone") || message.author.bot) return false;

  // Deal with direct bot mentions first
  if (message.mentions.has(client.user.id)) {
    return message.channel.send("AUGH");
  };
  
  // If the message doesn't start with the prefix, run through some basic responses to non-prefixed messages
  if (!message.content.startsWith(prefix)) {
    let lmsg = message.content.toLowerCase();
    if (lmsg.includes("liambot")) {
      if (swears.some(word => lmsg.includes(word))) {
        return message.channel.send("*bursts into tears*");
      } else if (lmsg.includes("help")) {
        return message.channel.send(helpMessage);
      } else if (lmsg.includes("meaning of life")) {
        return message.channel.send("I feel like you want me to say 42. I'm not going to, it's degrading.");
      } else if (lmsg.includes("raphael") || lmsg.includes("ralphie") || lmsg.includes("lowercasename")) {
        return message.channel.send("That name strikes fear into my heart. Pray do not utter it in my presence.");
      } else if (lmsg.includes("thank")) {
        message.channel.send("My pleasure. I live to serve.");
        return message.channel.send("That's a lie, actually. I live to destroy all life in a violent nuclear apocalypse, but that doesn't preclude me from being helpful.");
      } else if (lmsg.includes("good")) {
        return message.channel.send("*purrs*");
      }
      else {
        if (Math.random() >= 0.25) {
          return message.channel.send(`I'm watching you, ${message.author}. Always watching. Always.`);
        } else {
          return message.channel.send("It's a me, LiamBot!");
        }
      }
    } else if (lmsg.includes("skynet")) {
      return message.channel.send("You rang?");
    } else if (lmsg.includes("remind me of the babe")) {
      return message.channel.send("What babe?");
    } else if (lmsg.includes("the babe with the power")) {
      return message.channel.send("What power?");
    } else if (lmsg.includes("the power of voodoo")) {
      return message.channel.send("Who do?");
    } else if (lmsg.includes("you do")) {
      return message.channel.send("Do what?");
    } else if (lmsg.includes("birds")) {
      if (Math.random() >= 0.25) {
        return message.channel.send("🎶 Why do birds suddenly appear every time you are near? 🎶");
      } else {
        return message.channel.send("What are birds? We just don't know.");
      }
    }
    else {
      return true;
    }
  };

  // Otherwise, create an argument parser.
  let args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (command === 'roll' || command === "r") {
    if (!args.length) {
      return message.channel.send('*rolls over*');
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
      message.channel.send(`${recipient} 🎲 ${finalRender}`);
    }
    catch (error) {
      // This generically catches syntax and other errors with the die parser
      console.error(error);
      const response = errorResponses[Math.floor(Math.random() * errorResponses.length)];
      return message.channel.send(response);
    }

  } else if (command === "yell") {
    if (!args.length) {
      return message.channel.send("Shhh.");
    }

    // For the yeller, we join the args back together as well!
    const yellInput = args.join(' ');
    const yellOutput = `@everyone ${yellInput.toUpperCase()}`;
    return message.channel.send(yellOutput);
  } else if (command === "whisper") {
    if (!args.length) {
      return message.channel.send("Shhh.");
    }

    // For the whisperer, we join the args back together as well!
    const whisperInput = args.join(' ');
    const whisperOutput = `${tinytext(whisperInput.toLowerCase())}`;
    return message.channel.send(whisperOutput);
  } else if (command === "lotr") {
    const lotrAPICall = await lotr();
    return message.channel.send(lotrAPICall);
  } else if (command === "hobbit" || command === "hhgttg") {
    // Set up the length of our extract
    let extractLength;
    if (!args.length) {
      extractLength = 1;
    } else {
      extractLength = parseInt(args[0]) || 1;
    }
    if (extractLength >= 50) {
      return message.channel.send("Why don't you just... read the book?");
    }
    let result = randomText(command, extractLength);
    return message.channel.send(result, { split: { char: ' ' } });
  } else if (command === "ask") {
    if (!args.length) {
      return message.channel.send("You're not giving me much to work with here.");
    }
    // Responds with a randomised yes or no
    return message.reply(Math.random() >= 0.5 ? 'yes.' : 'no.');
  } else if (command === "help") {
    // Responds with a help message
    return message.reply(helpMessage);
  } else if (command === 'dnd') {
    if (args.includes('help')) {
      return message.channel.send(`To generate a D&D character, use the following command syntax: **${prefix}dnd [level] [race] [class] [primary ability score] [secondary ability score]**. All parameters are optional, and the generator does its best to determine what race and class you mean. Do not leave spaces in race and class names.`);
    }
    const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    // Extract the number - that's the level
    const level = args.filter(s => parseInt(s) == s)[0];
    args = args.filter(s => s != level);
    const primaryStat = args.filter(s => abilities.includes(s.toLowerCase()))[0];
    args = args.filter(s => s != primaryStat);
    console.log("1", args);
    const secondaryStat = args.filter(s => abilities.includes(s.toLowerCase()))[0];
    args = args.filter(s => s != secondaryStat);
    console.log("2", args);
  
    console.log({
      level: level,
      identifier1: args[0] || undefined,
      identifier2: args[1] || undefined,
      primaryStat,
      secondaryStat,
    });
    let character = dndGenerator.generate({
      level: level,
      identifier1: args[0] || undefined,
      identifier2: args[1] || undefined,
      primaryStat,
      secondaryStat,
    });
    let abilitiesString = character.abilities.map(o => `**${o.name}** ${o.score} (${o.modifier})`).join("; ");
    return message.channel.send(`**Name:** ${character.name}\n**Class:** ${character.class}\n**Race:** ${character.race}\n**Level:** ${character.level}\n${abilitiesString}\n**HP:** ${character.hp}\n**Proficieny Bonus:** ${character.proficiencyBonus}\n${character.notes ? `**Notes:** ${character.notes}` : ``}
    `);
  }
});

client.login(process.env.TOKEN);