import { errorResponses } from '../dict.js';

/**
 * Get random objects from array without modifying the original
 * @param {Array} array - The array to select from
 * @param {Number} numberOfObjects - Number of objects to return
 * @returns {Array} - Array of randomly selected objects
 */
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

/**
 * Extract text within parentheses
 * @param {String} inputString - The string to extract from
 * @returns {String|null} - Extracted text or null if not found
 */
function extractTextInParentheses(inputString) {
    const regex = /\(([^)]+)\)/;
    const match = inputString.match(regex);
    if (match && match.length > 1) {
        return match[1];
    } else {
        return null;
    }
}

/**
 * Save a death record to the database
 * @param {Object} message - Discord message object
 * @param {Object} db - Database connection
 * @param {Function} cb - Callback function
 * @returns {Promise} - Promise resolving to callback result
 */
export const saveDied = async (message, db, cb) => {
    try {
      console.log('dying');
        const serverId = message.guild.id;
        const user_id = message.author.id;
        const user_username = message.author.username;
        const reason = extractTextInParentheses(message.content);

        await db.run(
            `INSERT INTO deaths (server, user_id, user_username, tally, reason)
             VALUES (?, ?, ?, ?, ?)`,
            [serverId, user_id, user_username, 1, reason]
        );

        return cb(message, 'Congratulations!', true);
    } catch (error) {
        console.error(error);
        return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
    }
};

/**
 * Return death statistics
 * @param {Object} message - Discord message object
 * @param {Object} db - Database connection
 * @param {Function} cb - Callback function
 * @returns {Promise} - Promise resolving to callback result
 */
export const returnDeaths = async (message, db, cb) => {
    try {
        // If no user is mentioned, show the leaderboard
        if (message.mentions.users && message.mentions.users.size === 0) {
            // Get all deaths
            const results = await db.all(`SELECT * FROM deaths`);

            // Tally results by user
            const talliedResults = results.reduce((acc, curr) => {
                if (acc && acc.length && acc.find(existing => existing.user_id === curr.user_id)) {
                    const existing = acc.find(existing => existing.user_id === curr.user_id);
                    existing.tally += 1;
                    return acc;
                } else {
                    acc.push(curr);
                    return acc;
                }
            }, []);

            // Sort by death count (highest first)
            const res = talliedResults.sort(({ tally: a }, { tally: b }) => b - a);

            // Format the leaderboard message
            const deathsLeaderboard = res.reduce((acc, curr) => {
                return acc + `\n${curr.user_username} - ${curr.tally}`;
            }, '');

            return cb(message, '**💀 Death Leaderboard 💀**\n' + deathsLeaderboard);
        } else {
            // Show deaths for a specific user
            const deathsFor = message.mentions.users.values().next().value;

            // Get deaths for the specified user
            const results = await db.all(
                `SELECT * FROM deaths WHERE user_username = ?`,
                [deathsFor.username]
            );

            // Filter to only include deaths with reasons
            const res = results.filter(r => r.reason);

            // Get random death reasons
            const randomDeaths = getRandomObjectsFromArray(res, 10);

            // Format the deaths list
            const deathsList = randomDeaths.reduce((acc, curr) => {
                return acc + `\n- ${curr.reason}`;
            }, '');

            return cb(message, `**💀 ${randomDeaths.length} Random Deaths For ${deathsFor.username} 💀**\n` + deathsList);
        }
    } catch (error) {
        console.error(error);
        return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
    }
};
