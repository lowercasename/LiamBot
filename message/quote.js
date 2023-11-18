const dict = require('./dict.js');

const getQuote = (args, message, db) => {
    let quoteId;
    let serverId = message.guild.id;
    if (args.includes('help')) {
        return (`To retrieve a random quote, simply type **${dict.prefix}quote**. To save a quote, reply to the message you want to save and type **${dict.prefix}quote save**.`);
    }
    //Save a quote
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
                const quote_url = quote.url;
                if (!quoteContent || !quoteContent.length) {
                    return sendMessage("I can't let you do that, Dave.");
                }
                db.query(`INSERT INTO quotes (timestamp, server, quoter_id, quoter_username, quote_id, quote, quote_author_id, quote_author_username,quote_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [timestamp, serverId, quoter_id, quoter_username, quoteId, quoteContent, quote_author_id, quote_author_username, quote_url], function (error, results, fields) {
                    if (error) {
                    console.error(error);
                    return (dict.errorResponses[Math.floor(Math.random() * dict.errorResponses.length)]);
                    }
                    return ('quote saved.', true);
                });
            });
        } else {
            return (`To save a new quote, reply to the message you want to save and and type **${prefix}quote save**.`);
        }
    } else {
        // We want to see a random quote!
        db.query(`SELECT * FROM quotes WHERE server = ? ORDER BY RAND() LIMIT 1;`, [serverId], async function (error, results, fields) {
            if (error) {
                console.error(error);
                return (dict.errorResponses[Math.floor(Math.random() * dict.errorResponses.length)]);
            };
            const result = results[0];
            console.log(result);
            let url;
            if (result.quote_url) {
                url = result.quote_url;
            } else {
                const message = async quote => {
                    const matchingMessages = [];
                    const server = await client.guilds.fetch(quote.server)
                        .then(server => {
                            const channels = server.channels.cache.array().filter(ch => ch.type === 'text');
                            return channels;
                        })
                        .catch(error => console.error(error));
                    for (const channel of server) {
                        const message = await channel.messages.fetch(quote.quote_id)
                            .then(message => {
                                return message;
                            })
                            .catch(error => console.log('Message not in channel'));
                        if (message) {
                            matchingMessages.push(message);
                        }
                    }
                    return matchingMessages;
                }
                url = message[0].url;
                db.query(`UPDATE quotes SET quote_url = ? where quote_id = ?`, [url,message[0].quote_id], function (error, results) {
                    if (error) {
                        console.error(error);
                    };
                });
            }
            if (result) {
                return (`**<${result.quote_author_username}>** ${result.quote}\n\n${url}`);
            } else {
                return ("There are no quotes saved on this server.")
            }
            // \n[Saved by @${result.quoter_username}]
            // [#${result.id}] 
        });
    }
}

module.exports.getQuote = getQuote;