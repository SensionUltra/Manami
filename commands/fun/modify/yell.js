module.exports = {
name: "yell",
description: "__**AAAAAAAAAAAAAA**__",
run: (client, message, args) => {
    let scream = args.join(' ').toUpperCase()
message.channel.send(`__**${scream}**__`)
}
}