const embed = require('../../../modules/auto/embeds')
module.exports = {
    name: 'add',
    description: 'add a role to a user',
    run: (client, message, args) => {
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return embed.error('Missing Permissions', 'i do not have permissions to manage roles!', message)
        if (!message.member.hasPermission('MANAGE_ROLES'))return embed.error('Missing Permissions!', 'You do not have valid permissions to use this cmd!', message)
        let role = message.mentions.roles.first()
        let member = message.mentions.members.first()
        if (!member) return embed.error('Missing Arguments', 'You need to mention a member!',message)
        if (!role) return embed.error('Missing Arguments', 'You need to mention a role!',message)
        if (member.roles.cache.has(role.id)) return embed.error('Invalid Mention!', `${member.user.username.replace(/^\w/, (w) => w.toUpperCase())} already has that role!`, message)
        member.roles.add(role)
        embed.succes(`Succesfully Added The Role`, `Succesfully added the role ${role.name} to ${member.user.username}`, message)
    }
}