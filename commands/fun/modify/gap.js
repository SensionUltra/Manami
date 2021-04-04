module.exports = {
name: "gap",
description: "adds a space inbetween each charicter",
run: (client, message, args) => {
    const text = args.join(' ')
    if (!text) return message.channel.send(`you need to provide text to modify!`)
    const spacedAndJoined = text.split('').join(' ')
    message.channel.send(`${spacedAndJoined}`)
}
}