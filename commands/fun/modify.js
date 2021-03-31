const { MessageEmbed } = require("discord.js");
module.exports = {
name: "modify",
description: "modified text with the options",
aliases: ['mod'],
run: (client, message, args) => {
const option = args[0]
const text = args.slice(1).join(' ')

const optionsList = [
    {name: `gap`, value: `Adds a space inbetween each charicter`, inline: true},
    {name: `reverse`, value: `Reverses the text`, inline: true},
]
const options = new MessageEmbed()
.setTitle(`Options To Modify Text`)
.addFields(optionsList)

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
                if (!option) return message.channel.send(options)
    message.channel.send('That is not a valid option')
}
}
}