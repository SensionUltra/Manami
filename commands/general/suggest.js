const embed = require('@auto/embeds')
const { MessageEmbed } = require("discord.js")
const suggestMax = 1500 // the maximim amout of charicters in a report

module.exports = {
    name: "suggest",
    description: "suggest something from anyserver!",
    run: (client, message, args) => {

        const channel = client.channels.cache.get("827075595015553044")

        const suggestMsg = args.join(' ')

        if(!suggestMsg) return embed.error('Missing Arguments', "You need to give me something to suggest", message)

        embed.succes('Succesfully Sent Your Suggestion To The Devs', `Your suggestion "${suggestMsg}", has now been sent to the devs, you will get a dm inbetween now and 2 weeks with information about your report`, message).catch(err => {
            if (err || suggestMsg.length > suggestMax) {
                embed.error('Could Not Send Your Report', 'Could not send your report, this is because it was to big', message)
                console.log(err)
            }
        })
        if (suggestMsg.length > suggestMax) {
            let suggestServer = 826614093695811594
            suggestServer.channel = 827075595015553044
            embed.error('Suggestion To Big', `The suggestion sent by ${message.author.username}, is to big to send`, suggestServer)
            return
        } else {

            const reportEmbed = new MessageEmbed()
                .setTitle("`✅` New Suggetion! `✅`")
                .setDescription(suggestMsg)
                .setFooter(`Sent By ${message.author.username} In Guild: ${message.guild.name}`)
                .setTimestamp()

            channel.send(reportEmbed)
        }
    }
}