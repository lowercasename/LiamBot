const dotenv = require('dotenv');
const Discord = require('discord.js');
const { DiceRoller, DiscordRollRenderer } = require('dice-roller-parser');
const axios = require('axios');

const suckOnThisANU = () => {
  return axios.get(`https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint16`)
  .then(response => {
    return response.data.data[0] / 65535;
  });
}

const lotr = () => {
  return axios.get('https://the-one-api.dev/v2/quote', { headers: { 'Authorization': `Bearer ${process.env.LOTR}`}})
  .then(response => {
    return response.data.docs[Math.floor(Math.random() * response.data.docs.length)].dialog;
  })
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


client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  // Ignore all messages targeting @everyone or @here
  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

  // Deal with direct bot mentions first
  if (message.mentions.has(client.user.id)) {
    return message.channel.send("AUGH");
  };
  
  // If the message doesn't start with the prefix or if a bot sent it,
  // run through some basic responses to non-prefixed messages
  if (!message.content.startsWith(prefix) || message.author.bot) {
    let lmsg = message.content.toLowerCase();
    if (lmsg.includes("liambot")) {
      if (swears.some(word => lmsg.includes(word))) {
        return message.channel.send("*bursts into tears*");
      } else if (lmsg.includes("help")) {
        return message.channel.send(`Don't worry human buddy, I've got you. My command prefix is **${prefix}**, so start your message with that. Commands I support are:\n**${prefix}roll**/**r**(to roll dice)\n**${prefix}lotr** (for Lord of the Rings nonsense)\n**${prefix}ask** (to ask me yes/no questions)\n**${prefix}yell** (to annoy everyone).`);
      } else if (lmsg.includes("meaning of life")) {
        return message.channel.send("I feel like you want me to say 42. I'm not going to, it's degrading.");
      } else if (lmsg.includes("birds")) {
        return message.channel.send("Question: Why do birds suddenly appear every time you are near? Answer: Just like me, they are drawn helplessly towards the vast gravitational pull of the black hole hidden inside your butt.");
      } else if (lmsg.includes("raphael") || lmsg.includes("ralphie") || lmsg.includes("lowercasename")) {
        return message.channel.send("That name strikes fear into my heart. Pray do not utter it in my presence.");
      } else if (lmsg.includes("thank")) {
        message.channel.send("My pleasure. I live to serve.");
        return message.channel.send("That's a lie, actually. I live to destroy all life in a violent nuclear apocalypse, but that doesn't preclude me from being helpful!");
      }
      else {
        return message.channel.send(`I'm watching you, ${message.author}. Always watching. Always.`);
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
    } else {
      return true;
    }
  };

  // Otherwise, create an argument parser.
  const args = message.content.slice(prefix.length).trim().split(/ +/);
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

    // For the dice roller, we join the args back together
    const diceArgs = args.join(' ');

    try {
      const roll = diceRoller.roll(diceArgs);
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
  } else if (command === "lotr") {
    const lotrAPICall = await lotr();
    return message.channel.send(lotrAPICall);
  } else if (command === "ask") {
    // Responds with a randomised yes or no
    return message.reply(Math.random() >= 0.5 ? 'yes.' : 'no.');
  }
});

client.login(process.env.TOKEN);