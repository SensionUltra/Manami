module.exports = {
    name: "leave",
    description: "make the bot loop the track!",
    cooldown: 3000,
    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id)
        if(!player) return message.channel.send("There is nothing currently playing")
        await player.trackRepeat(true)
        message.channel.send("Left the VC!")
    }
    }