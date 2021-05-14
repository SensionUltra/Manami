const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "kicks the pinged user",
    usage: "kick <user>",
    run: async(client, message, args, getChannelId, member) => {
        const target = message.mentions.members.first(); 
        let reason = args.slice(1).join(" "); 
        
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`you do not have the required permissions to use this command ${message.author}`)
        
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('i do not have permissions to kick members')
        
        if (!args[0]) return message.channel.send('Specify the member to kick')
        
        if(!target) return message.channel.send('User is not a member/not found')
        
        if (!target.kickable) return message.channel.send(`i can not kick ${target.user.username}, this is becuse either they have a role that is above mine or they are the owner of this server`)
        
        if(target.id == message.author.id) return message.channel.send('You can\'t kick yourself')

        if(!reason) reason = "No reason given"
        
        const kickedEmbed = new Discord.MessageEmbed()
        .setColor(`#ff0000`)
        .setTitle(`${target.user.username}`)
        .addField(`kicked by`, `${message.author}`)
        .addField(`reason`, `${reason}`)
        message.channel.send(kickedEmbed)
        target.kick(reason)
        const channelId = await getChannelId(member.guild.id);
		if (!channelId) return;

        const kickedLog = new Discord.MessageEmbed()
        .setTitle("Member Kicked")
        .setColor("RED")
        .addField("User", `${target.user}(${trage.user.tag})`, true)
        .addField("Moderator", `${message.author}(${message.author.tag})`, true)
        .addField("Reason", `**${reason}**`, true)
        .setFooter(`ID: ${target.user.id}`)
        .setTimestamp()

        client.channels.cache.get(channelId).send(kickedLog)

    }
}