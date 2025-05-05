import { errorResponses } from '../lib/dict.js';

export const returnRoll = (args, recipient, rollGenerator, renderer) => {
    if (!args.length) {
        return ('*rolls over*');
    }

    // For the dice roller, we join the args back together
    const diceArgs = args.join(' ');

    try {
        const roll = rollGenerator.roll(diceArgs);
        const render = renderer.render(roll).replaceAll("(", "[").replaceAll(")", "]");
        const result = render.match(/([0-9]*)[ ~*]*$/);
        let finalRender = render.slice(0, result.index) + `\`${result[1]}\`` + render.slice(result.index + result[1].length);
        // Trim our message in case it's too damn big
        finalRender = finalRender.substring(0, 1997);
        return `${recipient} 🎲 ${finalRender}`;
    } catch (error) {
        // This generically catches syntax and other errors with the die parser
        console.error(error);
        console.log('Die error');
        const response = errorResponses[Math.floor(Math.random() * errorResponses.length)];
        return response;
    }
};
