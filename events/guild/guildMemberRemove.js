const guildDoc = require('@settings/guild')
const replaceAll = require('@settings/member')
module.exports = {
    name: 'guildMemberRemove',
    run: async(member, client) => {
        const leave = await guildDoc.getLeave(member.guild.id)
        if (!leave?.message) return;
        console.log(member);
        const message = replaceAll(leave.message, member, true)
        const channel = member.guild.channels.cache.get(leave.channelId)
        channel.send(message)
    }
}