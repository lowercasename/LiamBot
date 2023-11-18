const findQuote = async quote => {
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