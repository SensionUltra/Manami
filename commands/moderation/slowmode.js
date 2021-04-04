const Discord = require('discord.js')

module.exports = {
name: "slowmode",
alises: ["slow"],
description: "set channel slowmdoe",
run: (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(':clock10:|Slowmode Set!')
    .setDescription(`Slowmode set to 0 seconds!`)
    .setFooter(`Slowmode set by ${message.author.tag}`)
    .setColor('#ffc8dd')

    const errembed = new Discord.MessageEmbed()
    .setTitle(':x:|Slowmode Set!')
    .setDescription(`Slowmode can't be set over 21600 seconds`)
    .setFooter(`Requested by ${message.author.tag}`)
    .setColor('#ffc8dd')
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You can\'t run this command!')
        if (!args[0]) {
            message.channel.setRateLimitPerUser(0).then(message.channel.send(embed))
            return
        }
        if(args[0] >= 21601) {
            message.channel.send(errembed)
            return
        }
        if(isNaN(parseInt(args[0]))) return message.channel.send('That is not a number')

        message.channel.setRateLimitPerUser(args[0])
            let slowembed = new Discord.MessageEmbed()
            .setTitle(':clock10:|Slowmode Set!')
            .setDescription(`Slowmode set to ${args[0]} seconds!`)
            .setFooter(`Slowmode set by ${message.author.tag}`)
            .setColor('#ffc8dd')
            
            message.channel.send(slowembed)
    }}