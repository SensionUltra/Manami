const embed = require('@auto/embeds')
const guild = require('@settings/guild')
module.exports = {
name: "set-welcome",
aliases: ["setupwelcome", "setwelcome"],
description: "Setup the welcome channel for your server",
cooldown: 60000,
run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return embed.error('Missing Permissions', 'You need the \`MANAGE_CHANNELS\` Permission', message)
    let options = [
        {name: '{member}', value: 'mentions the joined user'},
        {name: '{membercount}', value: 'the member count of the server for when the user joines'},
        {name: '{servername}', value: 'the name of the server'},
    ]
    if (!args[0]) return embed.fieldListEmbed('Optinal Arguments', options, message)
    if (args[0] == 'reset') {
        embed.succes('Sucessfully Reset Welcome', 'Sucessfully reset the welcome, now i will not send a message when someone joins', message)
        await guild.resetWelcome(message.guild.id)
        return 
    }
    if (!message.mentions.channels.first()) return embed.error('Missing Arguments', 'You need to mention a channel to send the message too!', message)
        const channelId = message.mentions.channels.first().id
        const channelName = client.channels.cache.get(channelId)
        const welcomeMessage = args.slice(1).join(` `)
        if (!welcomeMessage) return embed.error('Missing Arguments', 'You need to give me a message to send', message)
        guild.setWelcome(message.guild.id, channelId, welcomeMessage)
        embed.succes('Succesfully Set The Welcome Message', `Succesfully set the welcome message to "${welcomeMessage}", and welcome channel to #${channelName.name}`, message)
}
}