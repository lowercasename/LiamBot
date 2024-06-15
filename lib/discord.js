export const sendMessage = (message, content, reply, config) => {
    if (reply) {
        return message.reply(content, config);
    }
    return message.channel.send(content, config);
}
