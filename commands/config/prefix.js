const guild = require('@settings/guild');
const embed = require('@auto/embeds')
module.exports = {
name: "prefix",
description: "sets the servers prefix",
cooldown: 120000,
run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return embed.error('Missing Permissions', 'You need the \`\`MANAGE_SERVER\`\` Permission', message)
    const guildId = message.guild.id
    const prefix = args.join(' ') || client.config.prefix
    const newPrefix = await guild.setPrefix(guildId, prefix)
    message.guild.prefix = prefix
    embed.succes('Succesfully Changed The Server Prefix', `Succesfully changed the server prefix to ${newPrefix}`, message)
}
}