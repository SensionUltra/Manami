const { MessageEmbed } = require("discord.js");
module.exports = {
name: "whoisnt",
description: "who isnt the target user",
aliases: ['whoaint'],
run: (client, message, args) => {
    const target = message.mentions.users.first() || client.users.cache.find(user => user.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.cache.get(args[0]) || message.author

    const allMembers = message.guild.members.cache
    const notAllMembers = allMembers.filter(member => member.id != target.id).map(m => `${m}`).join(' | ')

    const targetEmbed = new MessageEmbed()
    .setTitle(`Everyone But ${target.username}`)
    .setDescription(`${notAllMembers}`)
    .setTimestamp()
    
    message.channel.send(targetEmbed)
}
}