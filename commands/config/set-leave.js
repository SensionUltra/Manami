const embed = require('@auto/embeds')
const guild = require('@settings/guild')
module.exports = {
name: "set-leave",
description: "set the leave channel and message",
aliases: ['setleave'],
run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return embed.error('Missing Permissions', 'You need the \`MANAGE_CHANNELS\` Permission', message)
    let options = [
        {name: '{member}', value: 'the tag of the left user'},
        {name: '{membercount}', value: 'the member count of the server for when the user leaves'},
        {name: '{servername}', value: 'the name of the server'},
    ]
    if (!args[0]) return embed.fieldListEmbed('Optinal Arguments', options, message)
    if (args[0] == 'reset') {
        embed.succes('Sucessfully Reset Leave', 'Sucessfully reset the leave, now i will not send a message when someone leaves', message)
        await guild.resetLeave(message.guild.id)
        return 
    }
    if (!message.mentions.channels.first()) return embed.error('Missing Arguments', 'You need to mention a channel to send the message too!', message)
        const channelId = message.mentions.channels.first().id
        const channelName = client.channels.cache.get(channelId)
        const leaveMessage = args.slice(1).join(` `)
        if (!leaveMessage) return embed.error('Missing Arguments', 'You need to give me a message to send', message)
        guild.setLeave(message.guild.id, channelId, leaveMessage)
        embed.succes('Succesfully Set The Leave Message', `Succesfully set the Leave message to "${leaveMessage}", and Leave channel to #${channelName.name}`, message)
}
}