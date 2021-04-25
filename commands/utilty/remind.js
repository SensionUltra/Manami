const { MessageEmbed } = require('discord.js')
const ms = require('ms')
module.exports = {
name: "remind",
aliases: [""],
description: "set a reminder!",
run: (client, message, args) => {
    let time = args[0]

    if (!time) {
        return message.inlineReply("`❌` Please provide a time!");
    }

    const reminder = args.join(" ").slice(args[0].length);

    const remindEmbed = new MessageEmbed()
        .setTitle("`✅` Remind Set")
        .addField("Reminder:", `${reminder}`)
        .addField("Timeout", `${time}`)

    message.channel.send(remindEmbed)

    setTimeout(function () {
        const finRemindEmbed = new MessageEmbed()
            .setTitle("`🚨` Reminder!!!")
            .setDescription(`**${reminder}**`)

        message.member.send(finRemindEmbed)
    }, ms(time))
}}