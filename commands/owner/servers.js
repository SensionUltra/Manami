const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "servers",
    aliases: ["server"],
    description: "see da servers like dababy",
    owner: true,
    run: (client, message, args) => {

        const daEmbed = new MessageEmbed()
            client.guilds.cache.forEach((guild) => {

            })


        message.channel.send(daEmbed)
    }
}