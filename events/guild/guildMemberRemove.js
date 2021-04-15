const guildDoc = require('@settings/guild')
module.exports = {
    name: 'guildMemberRemove',
    run: async(member, client) => {
        const leave = await guildDoc.getLeave(member.guild.id)
        if (!leave?.message) return;
        const message = leave.message.replace(`<@>`, `<@${member.id}>`)
        const channel = member.guild.channels.cache.get(leave.channelId)
        channel.send(message)
    }
}