const hobbit = require('./corpora/hobbit.js');
const hhgttg = require('./corpora/hhgttg.js');
const lotr = require('./corpora/lotr.js');
const silmarillion = require('./corpora/silmarillion.js');

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

const returnPassage = (args) => {
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
    return [result, false, { split: { char: ' ' } }];
};
module.exports.returnPassage = returnPassage;