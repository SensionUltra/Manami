const guildDoc = require('@settings/guild')
module.exports = {
    name: 'guildMemberAdd',
    run: async(member, client) => {
        const welcome = await guildDoc.getWelcome(member.guild.id)
        if (!welcome.message) return;
        const message = welcome.message.replace(`<@>`, `<@${member.id}>`)
        const channel = member.guild.channels.cache.get(welcome.channelId)
        channel.send(message)
    }
}