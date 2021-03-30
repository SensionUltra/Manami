const { MessageEmbed } = require('discord.js')

module.exports = {
name: "avatar",
aliases: ['av'],
description: "view someones avatar!",
run: (client, message, args) => {

    const target = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member

    const avembed = new MessageEmbed()
    .setAuthor(`${target.user.username}'s Avatar!`)
    .setDescription(`\`Links:\` **[png](${target.user.displayAvatarURL({format: "png", size: 1024})}) | [gif](${target.user.displayAvatarURL({format: "gif", size: 1024, dynamic: true})})**`)
    .setImage(target.user.displayAvatarURL({format: "png", size: 1024}))
    .setTimestamp()

    message.channel.send(avembed)
}
}