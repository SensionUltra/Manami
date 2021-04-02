module.exports = {
    name: "leave",
    description: "make the bot leave the vc!",
    run: async(client, message, args) => {
        const player = client.manager.players.get(message.guild.id)
        if(!player) return message.channel.send("There is nothing currently playing")
        await player.destroy()
        message.channel.send("Left the VC!")
    }
    }