const guildDoc = require('@settings/guild')
const replaceAll = require('@settings/member')
module.exports = {
    name: 'guildMemberAdd',
    run: async(member, client) => {
        const welcome = await guildDoc.getWelcome(member.guild.id)
        if (!welcome?.message) return;
        const message = replaceAll(welcome.message, member)
        const channel = member.guild.channels.cache.get(welcome.channelId)
        channel.send(message)
    }
}