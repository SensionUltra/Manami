const Discord = require('discord.js')

module.exports = {
    name: "ban",
    description: "bans the pinged user",
    usage: "ban <user>",
    run: (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        let reason = args.slice(1).join(" "); 
        
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`you do not have the required permissions to use this command ${message.author}`)
        d
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('i do not have permissions to ban members')
        
        if (!args[0]) return message.channel.send('Specify the member to ban')
        
        if (!target) return message.channel.send('User is not a member/not found')
        
        if (!target.bannable) return message.channel.send(`i can not ban ${target.user.username}, this is becuse either they have a role that is above mine or they are the owner of this server`)
        
        if(target.id == message.author.id) return message.channel.send('You can\'t ban yourself')

        if (!reason) reason = "No reason given"
        
        const bannedEmbed = new Discord.MessageEmbed()
        .setColor(`#ff0000`)
        .setTitle(`${target.user.username}`)
        .addField(`banned by`, `${message.author}`)
        .addField(`reason`, `${reason}`)
        message.channel.send(bannedEmbed)
        target.ban({reason: `${reason}`});
    }
}