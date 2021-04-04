const embed = require('@auto/embeds')
const guild = require('@settings/guild')
module.exports = {
name: "set-welcome",
aliases: ["setupwelcome", "setwelcome"],
description: "Setup the welcome channel for your server",
run: (client, message, args) => {
    const channelId = message.mentions.channels.first().id
    const channelName = client.channels.cache.get(channelId)
    const welcomeMessage = args.slice(1).join(` `)
    guild.setWelcome(message.guild.id, channelId, welcomeMessage)
    embed.succes('Succesfully Set The Welcome Message', `Succesfully set the welcome message to "${welcomeMessage}", and welcome channel to ${channelName.name}`, message)
}
}