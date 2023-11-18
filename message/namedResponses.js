const dict = require('./dict.js');

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

const getResponse = (lmsg, author) => {
    const standardResponses = {
        "help": dict.helpMessage,
        "meaning of life": "I feel like you want me to say 42. I'm not going to, it's degrading.",
        "raphael": dict.scurryRalphie,
        "ralphie": dict.scurryRalphie,
        "lowercasename": dict.scurryRalphie,
        "thank": "My pleasure. I live to serve.",
        "good": "*purrs* :3",
        "who": getMonkeys(author),
        "why": getMonkeys(author),
        "when": getMonkeys(author),
        "what": getMonkeys(author),
        "where": getMonkeys(author),
        "skynet": "You rang?",
        "remind me of the babe": "What babe?",
        "the babe with the power": "What power?",
        "the power of voodoo": "Who do?",
        "you do": "Do what?",
        "birds": getBirds(),
    };
    return standardResponses[standardResponses.keys().find(key => lmsg.contains(key))];
}
module.exports.getResponse = getResponse;