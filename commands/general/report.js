const { MessageEmbed } = require("discord.js")

module.exports = {
name: "report",
description: "report a bug from anyserver!",
run: (client, message, args) => {

    const channel = client.channels.cache.get("827075339980111925")

    const reportMsg = args.join(' ')

    if(!reportMsg) {
        message.channel.send("Please type something to report")
    }

    const embed = new MessageEmbed()
    .setTitle(`<:siren_ez:827804301576896552> New Report! <:siren_ez:827804301576896552>`)
    .setDescription(reportMsg)
    .setFooter(`Sent By ${message.author.username} In Guild: ${message.guild.name}`)
    .setTimestamp()

    channel.send(embed)
}
}