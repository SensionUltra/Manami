const Discord = require('discord.js')
module.exports = {
    name: "kick",
    description: "kicks the pinged user",
    run: (client, message, args) => {
        const target = message.mentions.members.first(); 

        const kickedEmbed = new Discord.MessageEmbed()
        .setColor(`#ff0000`)
        .setTitle(`${target.username}`)

        message.channel.send(kickedEmbed)
    }
}