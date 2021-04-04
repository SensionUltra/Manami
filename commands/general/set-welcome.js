module.exports = {
name: "set-welcome",
aliases: ["setupwelcome", "setwelcome"],
description: "Setup the welcome channel for your server",
run: (client, message, args) => {

    const channelId = message.mentions.channels.first()

    client.on('guildMemberAdd', (member) => {
        
        const message = `Please welcome <@${member.id}>`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })

}
}