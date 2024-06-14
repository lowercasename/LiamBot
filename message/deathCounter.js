import { errorResponses } from '../dict.js';

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

export const saveDied = (message, db, cb) => {
    function extractTextInParentheses(inputString) {
        const regex = /\(([^)]+)\)/;
        const match = inputString.match(regex);

        if (match && match.length > 1) {
            return match[1];
        } else {
            return null;
        }
    }
    const serverId = message.guild.id;
    const user_id = message.author.id;
    const user_username = message.author.username;
    const reason = extractTextInParentheses(message.content);
    return db.query(`INSERT INTO deaths (server, user_id, user_username, tally, reason) VALUES (?, ?, ?, ?, ?)`, [serverId, user_id, user_username, 1, reason], function (error) {
        if (error) {
            console.error(error);
            return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
        }
        return cb(message, 'Congratulations!', true);
    });
}

export const returnDeaths = (message, db, cb) => {
    if (message.mentions.users && message.mentions.users.size === 0) {
        const user_id = message.author.id;
        db.query(`SELECT * FROM deaths`, [user_id], function (error, results) {
            if (error) {
                console.error(error);
                return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
            }
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
            const res = talliedResults.sort(({ tally: a }, { tally: b }) => b - a);
            const deathsLeaderboard = res.reduce((acc, curr) => {
                return acc + `\n${curr.user_username} - ${curr.tally}`;
            }, '');
            return cb(message, '**💀 Death Leaderboard 💀**\n' + deathsLeaderboard);
        });
    } else {
        const deathsFor = message.mentions.users.values().next().value;
        db.query(`SELECT * FROM deaths WHERE user_username=?`, [deathsFor.username], function (error, results) {
            if (error) {
                console.error(error);
                return cb(message, errorResponses[Math.floor(Math.random() * errorResponses.length)]);
            }
            const res = results.filter(r => r.reason);
            const randomDeaths = getRandomObjectsFromArray(res, 10);
            const deathsList = randomDeaths.reduce((acc, curr) => {
                return acc + `\n- ${curr.reason}`;
            }, '');
            return cb(message, `**💀 ${randomDeaths.length} Random Deaths For ${deathsFor.username} 💀**\n` + deathsList);
        });
    }
}

