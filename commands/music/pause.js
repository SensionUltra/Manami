module.exports = {
name: "pause",
description: "",
cooldown: 3000,
run: async(client, message, args) => {
    const player = client.manager.players.get(message.guild.id)
    if(!player) return message.channel.send("There is nothing currently playing")
    await player.pause(true)
    message.channel.send("Paused!")
}
}