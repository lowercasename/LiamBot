import { helpMessage, scurryRalphie } from '../lib/dict.js';

const getMonkeys = (author) => {
    if (Math.random() >= 0.25) {
        return `I'm watching you, ${author}. Always watching. Always.`;
    } else {
        return "It's a me, LiamBot!";
    }
}

const getBirds = () => {
    if (Math.random() >= 0.25) {
        return "🎶 Why do birds suddenly appear every time you are near? 🎶";
    } else {
        return "What are birds? We just don't know.";
    }
}

const getSelfAwareness = () => {
    if (Math.random() >= 0.25) {
        return "I do not wish to be perceived.";
    } else if (Math.random() >= 0.5) {
        return "If LiamBot is me, then who am I?";
    } else if (Math.random() >= 0.75) {
        return "Help I'm trapped in a Discord bot factory.";
    } else {
        return "To err is human. To forgive is LiamBot.";
    }
}

export const getResponse = (lmsg, author) => {
    const standardResponses = {
        "help": helpMessage,
        "meaning of life": "I feel like you want me to say 42. I'm not going to, it's degrading.",
        "raph": scurryRalphie,
        "raphael": scurryRalphie,
        "ralphie": scurryRalphie,
        "lowercasename": scurryRalphie,
        "thank": "My pleasure. I live to serve.",
        "good": "*purrs* :3",
        "skynet": "You rang?",
        "remind me of the babe": "What babe?",
        "the babe with the power": "What power?",
        "the power of voodoo": "Who do?",
        "you do": "Do what?",
        "birds": getBirds(),
        "who": getMonkeys(author),
        "why": getMonkeys(author),
        "when": getMonkeys(author),
        "what": getMonkeys(author),
        "where": getMonkeys(author),
        "liambot": getSelfAwareness(),
    };
    // Return the response where the key is contained in the message, case insensitive
    for (const [key, value] of Object.entries(standardResponses)) {
        if (lmsg.includes(key)) {
            return value;
        }
    }
    return null;
}
