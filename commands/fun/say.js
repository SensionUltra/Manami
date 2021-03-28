module.exports = {
name: "say",
description: "makes the bot say what you want it to say",
run: (client, message, args) => {
    const toSay = args.join(' ')
        message.channel.send(toSay)
    }
}