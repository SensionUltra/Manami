const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
module.exports = {
name: "serverinfo",
aliases: ["infoboutdaserver"],
description: "get information about the current guild",
run: (client, message, args) => {
    const fields = [  
        {name: ":name_badge: Server Name", value: message.guild.name, inline: true},
        {name: ":crown: Owner", value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, inline: true},
        {name: ":people_holding_hands: Members", value: `${message.guild.memberCount} members!`, inline: true},
        {name: ":open_file_folder:  Channels", value: `${message.guild.channels.cache.size}`, inline: true},
        {name: ":sparkles: Roles", value: message.guild.roles.cache.size, inline: true},
        {name: ":birthday: Created On", value: message.guild.createdAt, inline: true}
    ]
    const serverEmbed = new MessageEmbed()
    .setAuthor('Server Information')
    .addFields(fields)
    .setThumbnail(message.guild.iconURL({
        dynamic: true
      }))

    message.channel.send(serverEmbed)
}
}