const guild = require('@settings/guild');
const embed = require('@auto/embeds')
module.exports = {
name: "prefix",
description: "sets the servers prefix",
cooldown: 120000,
run: async(client, message, args) => {
    const guildId = message.guild.id
    const prefix = args.join(' ') || 'm.'
    const newPrefix = await guild.setPrefix(guildId, prefix)
    client.emit('ready')
    
    embed.succes('Succesfully Changed The Server Prefix', `Succesfully changed the server prefix to ${newPrefix}`, message)
}
}