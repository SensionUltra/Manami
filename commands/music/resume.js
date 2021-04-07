module.exports = {
    name: "resume",
    description: "Unpauses the currently paused song",
    cooldown: 3000,
    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id)
        if(!player) return message.channel.send("There is nothing currently playing")
        await player.pause(false)
        message.channel.send("Resumed!")
    }
    }