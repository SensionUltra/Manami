const embed = require('../../embeds')
module.exports = {
name: "modify",
description: "modified text with the options",
aliases: ['mod'],
run: (client, message, args) => {
const option = args[0]
const text = args.slice(1).join(' ')

const optionsList = [
    {name: `Gap`, value: `Adds a space inbetween each charicter`, inline: true},
    {name: `Reverse`, value: `Reverses the text`, inline: true},
]

switch (option) {
    case 'gap':
        if (!text) return message.channel.send(`you need to provide text to modify!`)
        const spacedAndJoined = text.split('').join(' ')
        message.channel.send(`${spacedAndJoined}`)
        
        break;
        case 'reverse':
            if (!text) return message.channel.send(`you need to provide text to modify!`)
            const reversed = text.split('').reverse().join('')
            message.channel.send(reversed)
                break;
                default: 
                if (!option) return embed.fieldListEmbed('Options To Modify Text', optionsList, message)
    message.channel.send('That is not a valid option')
}
}
}