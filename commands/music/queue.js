const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "queue",
    description: "Lists the currently queud song",
    cooldown: 3000,
    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id)
        if(!player) return message.channel.send("There is nothing currently playing")
        const queue = await player.queue
        
        const qembed = new MessageEmbed()
        .addField("Current Song:", `[${queue.current.title}](${queue.current.uri})`)

        message.channel.send(qembed)

    }
    }