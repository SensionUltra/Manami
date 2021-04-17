const embed = require('@auto/embeds')
const guild = require('@settings/guild')
module.exports = {
name: "set-leave",
description: "set the leave channel and message",
aliases: ['setleave'],
run: (client, message, args) => {
    let options = [
        {name: '{member}', value: 'the tag of the left user'},
        {name: '{membercount}', value: 'the member count of the server for when the user leaves'},
        {name: '{servername}', value: 'the name of the server'},
    ]
    if (!args[0]) return embed.fieldListEmbed('Optinal Arguments', options, message)
    if (!message.mentions.channels.first()) return embed.error('Missing Arguments', 'You need to mention a channel to send the message too!', message)
        const channelId = message.mentions.channels.first().id
        const channelName = client.channels.cache.get(channelId)
        const leaveMessage = args.slice(1).join(` `)
        if (!leaveMessage) return embed.error('Missing Arguments', 'You need to give me a message to send', message)
        guild.setLeave(message.guild.id, channelId, leaveMessage)
        embed.succes('Succesfully Set The Leave Message', `Succesfully set the Leave message to "${leaveMessage}", and Leave channel to #${channelName.name}`, message)
}
}