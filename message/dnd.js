import { generate } from '../dndgen.js';
import { prefix } from '../dict.js';

export const doDND = (args) => {
    if (args.includes('help')) {
        return `To generate a D&D character, use the following command syntax: **${prefix}dnd [level] [race] [class] [primary ability score] [secondary ability score]**. All parameters are optional, and the generator does its best to determine what race and class you mean. Do not leave spaces in race and class names.`;
    }
    const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    // Extract the number - that's the level
    const level = args.filter(s => parseInt(s) == s)[0];
    args = args.filter(s => s != level);
    const primaryStat = args.filter(s => abilities.includes(s.toLowerCase()))[0];
    args = args.filter(s => s != primaryStat);
    const secondaryStat = args.filter(s => abilities.includes(s.toLowerCase()))[0];
    args = args.filter(s => s != secondaryStat);

    // console.log({
    //     level: level,
    //     identifier1: args[0] || undefined,
    //     identifier2: args[1] || undefined,
    //     primaryStat,
    //     secondaryStat,
    // });
    let character = generate({
        level: level,
        identifier1: args[0] || undefined,
        identifier2: args[1] || undefined,
        primaryStat,
        secondaryStat,
    });
    let abilitiesString = character.abilities.map(o => `**${o.name}** ${o.score} (${o.modifier})`).join("; ");
    return (`**Name:** ${character.name}\n**Class:** ${character.class}\n**Race:** ${character.race}\n**Level:** ${character.level}\n${abilitiesString}\n**HP:** ${character.hp}\n**Proficieny Bonus:** ${character.proficiencyBonus}\n${character.notes ? `**Notes:** ${character.notes}` : ``}`);
}