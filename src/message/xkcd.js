import { errorResponses, prefix } from "../lib/dict.js";

// Formats the xkcd result into a Discord message
const formatXkcdResult = (result) => {
    const title = result.title;
    const altTitle = result.altTitle;
    const url = `https://xkcd.com/${result.id}/`;
    const imageUrl = result.imageUrl;
    return `**${title}**${altTitle ? ` \n_${altTitle}_` : ''}${url ? `\n🔗 <${url}>` : ''}${imageUrl ? `\n🖼️ ${imageUrl}` : ''}`;
}

const fetchFindXkcd = async (q) => {
    const h = new Headers();
    h.append("Accept", "application/json");
    h.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "searches": [
            {
                "query_by": "title,altTitle,transcript,topics,embedding",
                "query_by_weights": "127,80,80,1,1",
                "num_typos": 1,
                "exclude_fields": "embedding",
                "vector_query": "embedding:([], k: 30, distance_threshold: 0.1, alpha: 0.9)",
                "highlight_full_fields": "title,altTitle,transcript,topics,embedding",
                "collection": "xkcd",
                "q": q,
                "facet_by": "topics,publishDateYear",
                "max_facet_values": 100,
                "page": 1,
                "per_page": 5
            }
        ]
    });

    const options = {
        method: "POST",
        headers: h,
        body,
    };

    const res = await fetch("https://qtg5aekc2iosjh93p.a1.typesense.net/multi_search?use_cache=true&x-typesense-api-key=8hLCPSQTYcBuK29zY5q6Xhin7ONxHy99", options);
    if (!res.ok) {
        return errorResponses[Math.floor(Math.random() * errorResponses.length)];
    }
    const json = await res.json();
    const firstResult = json.results[0]?.hits[0]?.document;
    if (!firstResult) {
        return "No results found.";
    }
    return firstResult;
}

export const respondXkcd = async (args) => {
    if (!args.length || args.includes('help')) {
        return `To show a relevant* xkcd comic, type **${prefix}xkcd [search term]**. For example, **${prefix}xkcd spiders**.\n\n* Results are not guaranteed to be relevant. Please consult your doctor to see if xkcd is right for you.`;
    }
    const q = args.join(' ');
    const result = await fetchFindXkcd(q);
    return formatXkcdResult(result);
}
