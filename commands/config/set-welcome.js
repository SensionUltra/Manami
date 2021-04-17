const embed = require('@auto/embeds')
const guild = require('@settings/guild')
module.exports = {
name: "set-welcome",
aliases: ["setupwelcome", "setwelcome"],
description: "Setup the welcome channel for your server",
cooldown: 60000,
run: (client, message, args) => {
    let options = [
        {name: '{member}', value: 'mentions the joined user'},
        {name: '{membercount}', value: 'the member count of the server for when the user joines'},
        {name: '{servername}', value: 'the name of the server'},
    ]
    if (!args[0]) return embed.fieldListEmbed('Optinal Arguments', options, message)
    if (!message.mentions.channels.first()) return embed.error('Missing Arguments', 'You need to mention a channel to send the message too!', message)
        const channelId = message.mentions.channels.first().id
        const channelName = client.channels.cache.get(channelId)
        const welcomeMessage = args.slice(1).join(` `)
        if (!welcomeMessage) return embed.error('Missing Arguments', 'You need to give me a message to send', message)
        guild.setWelcome(message.guild.id, channelId, welcomeMessage)
        embed.succes('Succesfully Set The Welcome Message', `Succesfully set the welcome message to "${welcomeMessage}", and welcome channel to #${channelName.name}`, message)
}
}