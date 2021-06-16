const embed = require('../../../modules/auto/embeds')
module.exports = {
    name: 'remove',
    description: 'remove a role from user',
    run: (client, message, args) => {
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return embed.error('Missing Permissions', 'i do not have permissions to manage roles!', message)
        if (!message.member.hasPermission('MANAGE_ROLES'))return embed.error('Missing Permissions!', 'You do not have valid permissions to use this cmd!', message)
        let role = message.mentions.roles.first()
        let member = message.mentions.members.first()
        if (!member) return embed.error('Missing Arguments', 'You need to mention a member!',message)
        if (!role) return embed.error('Missing Arguments', 'You need to mention a role!',message)
        if (!member.roles.cache.has(role.id)) return embed.error('Invalid Mention!', `${member.user.username.replace(/^\w/, (w) => w.toUpperCase())} does not have that role!`, message)
        member.roles.remove(role)
        embed.succes(`Succesfully Removed The Role`, `Succesfully removed the role ${role.name} from ${member.user.username}`, message)
    }
}