import { text as hobbitText } from '../corpora/hobbit.js';
import { text as hhgttgText } from '../corpora/hhgttg.js';
import { text as lotrText } from '../corpora/lotr.js';
import { text as silmarillionText } from '../corpora/silmarillion.js';

const randomText = (text, length = 1) => {
    let source;
    switch (text) {
        case 'hobbit':
            source = hobbitText;
            break;
        case 'hhgttg':
            source = hhgttgText;
            break;
        case 'lotr':
            source = lotrText;
            break;
        case 'silmarillion':
            source = silmarillionText;
            break;
        default:
            return false;
    }
    const index = Math.floor(Math.random() * source.length);
    return source.slice(index, index + length).join(" ");
}

export const returnPassage = (message, args) => {
    // Set up the length of our extract
    let validBooks = ["hobbit", "hhgttg", "lotr", "silmarillion"];
    let extractLength, book;
    if (!args.length) {
        return [`Pick a book to read from (${[validBooks].join(', ')}).`, false];
    } else {
        extractLength = parseInt(args[1]) || 1;
        if (extractLength >= 50) {
            return ["Why don't you just... read the book?", false];
        }
        book = validBooks.includes(args[0]) ? args[0] : validBooks[Math.floor(Math.random() * validBooks.length)];
    }
    let result = randomText(book, extractLength);
    return [result, false, { split: { char: ' ' } }];
};