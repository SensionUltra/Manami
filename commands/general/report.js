const embed = require('@auto/embeds')
const { MessageEmbed } = require("discord.js")
const reportMax = 1500 // the maximim amout of charicters in a report

module.exports = {
name: "report",
description: "report a bug from anyserver!",
run: (client, message, args) => {

    const channel = client.supportServer.reportChannel

    const reportMsg = args.join(' ')

    if(!reportMsg) return embed.error('Missing Arguments', "You need to give me something to report", message)

    embed.succes('Succesfully Sent Your Report To The Devs', `Your report "${reportMsg}", has now been sent to the devs, you will get a dm inbetween now and 2 weeks with information about your report`, message).catch(err => {
        if (err || reportMsg.length > reportMax) {
            embed.error('Could Not Send Your Report', 'Could not send your report, this is becuse it was to big', message)
            console.log(err)
        }
    })
if (reportMsg.length > reportMax) {
    let reportServer = client.supportServer
    reportServer.channel = reportServer.reportChannel
    embed.error('Report To Big', `The report sent by ${message.author.username}, is to big to send`, reportServer)
    return
} else {

    const reportEmbed = new MessageEmbed()
    .setTitle(`<:siren_ez:827804301576896552> New Report! <:siren_ez:827804301576896552>`)
    .setDescription(reportMsg)
    .setFooter(`Sent By ${message.author.username} In Guild: ${message.guild.name}`)
    .setTimestamp()
    
    channel.send(reportEmbed)
}
}
}