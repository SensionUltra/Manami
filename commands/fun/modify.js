module.exports = {
name: "modify",
description: "modified text with the options",
aliases: ['mod'],
run: (client, message, args) => {
const option = args[0]
const text = args.slice(1).join(' ')

switch (option) {
    case 'gap':
        const spacedAndJoined = text.split('').join(' ')
        message.channel.send(`${spacedAndJoined}`)
    break;
    case 'reverse':
        const reversed = text.split('').reverse().join('')
        message.channel.send(reversed)
    break;
    default: 
    message.channel.send('you need to provide a option')
}
}
}