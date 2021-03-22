const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "help",
    aliases: ["commands"],
    descripton: "get help about manami's commands!",
    run: (client, message, args) => {

            const embed = new MessageEmbed()
            .setTitle('Manami\'s Help')
            .setDescription("Here are all my available commands!")
            .addField("<:infomine:806711846479986749> Info", "\`ping\` \`help\`")

            .setColor("BLUE")

            message.channel.send(embed)

    }
}