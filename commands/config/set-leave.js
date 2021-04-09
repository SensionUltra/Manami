const embed = require('@auto/embeds')
const guild = require('@settings/guild')
module.exports = {
name: "set-leave",
description: "set the leave channel and message",
aliases: ['setleave'],
run: (client, message, args) => {
    const channelId = message.mentions.channels.first().id
    const channelName = client.channels.cache.get(channelId)
    const leaveMessage = args.slice(1).join(` `)
    guild.setLeave(message.guild.id, channelId, leaveMessage)
    embed.succes('Succesfully Set The Leave Message', `Succesfully set the Leave message to "${leaveMessage}", and Leave channel to #${channelName.name}`, message)
}
}