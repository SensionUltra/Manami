const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "kicks the pinged user",
    usage: "kick <user>",
    run: (client, message, args) => {
        const target = message.mentions.members.first(); 
        let reason = args.slice(1).join(" "); 

        if (!message.author.hasPermission('KICK_MEMBERS')) return message.channel.send(`you do not have the required permissions to use this command ${message.author}`)

        if(target == message.author.id) return message.channel.send('You can\'t kick yourself')

        if(target == message.author.id) return message.channel.send('Cant kick yourself')

        if (!args[0]) return message.channel.send('Specify the member to kick')

        if(!target) return message.channel.send('User is not a member/not found')

        if(!reason) reason = "No reason given"
        
        const kickedEmbed = new Discord.MessageEmbed()
        .setColor(`#ff0000`)
        .setTitle(`${target.user.username}`)
        .addField(`kicked by`, `${message.author}`)
        .addField(`reason`, `${reason}`)
        message.channel.send(kickedEmbed)
        target.kick(reas)
    }
}