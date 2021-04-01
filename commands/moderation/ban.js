const Discord = require('discord.js')
const embed = require('../../embeds')
module.exports = {
    name: "ban",
    description: "bans the pinged user",
    usage: "ban <user>",
    run: (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        let reason = args.slice(1).join(" "); 
        
        if (!message.member.hasPermission('BAN_MEMBERS')) return embed.error('Missing Permissions', `you do not have the required permissions to use this command ${message.author}`, message)
        
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return embed.error('Missing Permissions', 'i do not have permissions to ban members', message)
        
        if (!args[0]) return embed.error('Missing Arguments', 'Specify the member to ban', message)
        
        if (!target) return embed.error('Incorrect Mention', 'User is not a member/not found', message)
        
        if (!target.bannable) return embed.error('Permissions Error', `i can not ban ${target.user.username}, this is becuse either they have a role that is above mine or they are the owner of this server`, message)
        
        if(target.id == message.author.id) return embed.error('User Error', 'You can\'t ban yourself', message)

        if (!reason) reason = "No reason given"
        const fields = [
            {name: `Banned By`, value: `${message.author}`},
            {name: `Reason`, value: `${reason}`},
            {name: `Users Id`, value: `${target.id}`}
        ]
        embed.fieldListEmbed(`${target.user.username}`, fields, message, '#ff0000')
        target.ban({reason: `${reason}`});
    }
}