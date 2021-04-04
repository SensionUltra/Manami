module.exports = {
name: "reverse",
description: "reverses text",
run: (client, message, args) => {
    const text = args.join(' ')
    if (!text) return message.channel.send(`you need to provide text to modify!`)
    const reversed = text.split('').reverse().join('')
    message.channel.send(reversed)
}
}