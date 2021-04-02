const { MessageEmbed } = require("discord.js");


module.exports = {
name: "poll",
description: "make a poll",
run: async(client, message, args) => {
    let pollChannel = message.mentions.channels.first()
    let pollDescription = args.slice(1).join(' ');
    if(!pollChannel) {
        message.reply("Please mention a valid channel")
        return
    }
    if(!pollDescription) {
        message.reply("Please enter a poll description")
        return
    }
    let embedPoll = new MessageEmbed()
    .setTitle(":open_mouth: Manami Poll :open_mouth:")
    .setDescription(pollDescription)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Poll Made By ${message.author.username}`)
    pollChannel.send(embedPoll)
    let msgEmbed = await pollChannel.send(embedPoll);
    await msgEmbed.react('<:check_yes:827336328965521459>')
    await msgEmbed.react('<:check_no:827336436826374175>')
}
}