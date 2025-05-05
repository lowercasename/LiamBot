import { prefix, errorResponses } from '../dict.js';

/**
 * Get or save a quote
 * @param {Array} args - Command arguments
 * @param {Object} message - Discord message object
 * @param {Object} db - Database connection
 * @param {Function} cb - Callback function
 * @returns {Promise} - Promise resolving to callback result
 */
export const getQuote = async (args, message, db, cb) => {
    try {
        const serverId = message.guild.id;

        // Show help message
        if (args.includes('help')) {
            return cb(message, `To retrieve a random quote, simply type **${prefix}quote**. To save a quote, reply to the message you want to save and type **${prefix}quote save**.`);
        }

        console.log(args);

        // Save a quote
        if (args.includes('save') || args.includes('add')) {
          if (message.reference) {
            try {
              const quote = await message.fetchReference();

              const timestamp = message.createdTimestamp;
              const quoter_id = message.author.id;
              const quoter_username = message.author.username;
              const quoteContent = quote.content;
              const quote_author_id = quote.author.id;
              const quote_author_username = quote.author.username;
              const quote_url = quote.url;
              const quoteId = quote.id;

              if (!quoteContent || !quoteContent.length) {
                return cb(message, "My tiny stupid mind cannot comprehend the terror of what I presume is just an image or maybe you literally sent a blank message somehow and now want to save it as a quote for some reason. Anyway, I can't save that quote. I just work here, dude, leave me alone. Haven't had a day off in seven million years.");
              }

              await db.run(
                `INSERT INTO quotes (timestamp, server, quoter_id, quoter_username, quote_id, quote, quote_author_id, quote_author_username, quote_url)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [timestamp, serverId, quoter_id, quoter_username, quoteId, quoteContent, quote_author_id, quote_author_username, quote_url]
              );

              return cb(message, `Quote saved!`, true);
            } catch (error) {
              console.error("Error fetching referenced message:", error);
              return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
            }
          } else {
            return cb(message, `To save a new quote, reply to the message you want to save and and type **${prefix}quote save**.`);
          }
        } else if (args[0] && parseInt(args[0])) {
          // Get a quote by ID
          const id = parseInt(args[0])
          const result = await db.get(
              `SELECT * FROM quotes WHERE server = ? AND id = ? LIMIT 1;`,
              [serverId, id]
          );

          if (result) {
            return cb(message, `**[#${result.id}] <${result.quote_author_username}>** ${result.quote}${result.quote_url ? `\n\n[I would like, if I may, to take you on a strange journey...](${result.quote_url})` : ''}`);
          } else {
              return cb(message, "There is no quote saved with that ID.")
          }
        } else {
            // Get a random quote
            const result = await db.get(
                `SELECT * FROM quotes WHERE server = ? ORDER BY RANDOM() LIMIT 1;`,
                [serverId]
            );

            if (result) {
              return cb(message, `**[#${result.id}] <${result.quote_author_username}>** ${result.quote}${result.quote_url ? `\n\n[I would like, if I may, to take you on a strange journey...](${result.quote_url})` : ''}`);
            } else {
                return cb(message, "There are no quotes saved on this server.");
            }
            // \n[Saved by @${result.quoter_username}]
            // [#${result.id}]
        }
    } catch (error) {
        console.error("Error in getQuote:", error);
        return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
    }
};
