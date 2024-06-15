import { prefix, errorResponses } from '../dict.js';

export const getQuote = (args, message, db, cb) => {
    let quoteId;
    let serverId = message.guild.id;
    if (args.includes('help')) {
        return cb(message, `To retrieve a random quote, simply type **${prefix}quote**. To save a quote, reply to the message you want to save and type **${prefix}quote save**.`);
    }
    //Save a quote
    if (args.includes('save') || args.includes('add')) {
        if (message.reference) {
            message.fetchReference()
                .then(quote => {
                    console.log(quote);
                    const timestamp = message.createdTimestamp;
                    const quoter_id = message.author.id;
                    const quoter_username = message.author.username;
                    const quoteContent = quote.content;
                    const quote_author_id = quote.author.id;
                    const quote_author_username = quote.author.username;
                    const quote_url = quote.url;
                    if (!quoteContent || !quoteContent.length) {
                        return cb(message, "My tiny stupid mind cannot comprehend the terror of what I presume is just an image or maybe you literally sent a blank message somehow and now want to save it as a quote for some reason. Anyway, I can't save that quote. I just work here, dude, leave me alone. Haven't had a day off in seven million years.");
                    }
                    db.query(`INSERT INTO quotes (timestamp, server, quoter_id, quoter_username, quote_id, quote, quote_author_id, quote_author_username, quote_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [timestamp, serverId, quoter_id, quoter_username, quoteId, quoteContent, quote_author_id, quote_author_username, quote_url], function (error) {
                        if (error) {
                            console.error(error);
                            return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
                        }
                        return cb(message, `Quote saved!`, true);
                    });
                });
        } else {
            return cb(message, `To save a new quote, reply to the message you want to save and and type **${prefix}quote save**.`);
        }
    } else {
        // We want to see a random quote!
        db.query(`SELECT * FROM quotes WHERE server = ? ORDER BY RAND() LIMIT 1;`, [serverId], async function (error, results) {
            if (error) {
                console.error(error);
                return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
            }
            const result = results[0];
            if (result) {
                return cb(message, `**<${result.quote_author_username}>** ${result.quote}${result.quote_url ? `\n\n[I would like, if I may, to take you on a strange journey...](${result.quote_url})` : ''}`);
            } else {
                return cb(message, "There are no quotes saved on this server.")
            }
            // \n[Saved by @${result.quoter_username}]
            // [#${result.id}] 
        });
    }
}
