const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "kicks the pinged user",
    usage: "kick <user>",
    run: (client, message, args) => {
        const target = message.mentions.members.first(); 
        let reason = args.slice(1).join(" "); 
        
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`you do not have the required permissions to use this command ${message.author}`)
        
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('i do not have permissions to kick members')
        
        if (!target.kickable) return message.channel.send(`i can not kick ${target.user.username}, this is becuse either they have a role that is above mine or they are the owner of this server`)
        
        if(target.id == message.author.id) return message.channel.send('You can\'t kick yourself')

        if(target.id == message.author.id) return message.channel.send('Cant kick yourself')

        if (!args[0]) return message.channel.send('Specify the member to kick')

        if(!target) return message.channel.send('User is not a member/not found')

        if(!reason) reason = "No reason given"
        
        const kickedEmbed = new Discord.MessageEmbed()
        .setColor(`#ff0000`)
        .setTitle(`${target.user.username}`)
        .addField(`kicked by`, `${message.author}`)
        .addField(`reason`, `${reason}`)
        message.channel.send(kickedEmbed)
        target.kick(reason)
    }
}