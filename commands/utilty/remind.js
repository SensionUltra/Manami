const { MessageEmbed } = require('discord.js')
const ms = require('ms')
module.exports = {
name: "remind",
aliases: [""],
description: "set a reminder!",
run: (client, message, args) => {
    let matches = args.join(' ').match(/"(.+)" ?, ?"(\d+)" ?, ?"(s|m|h|d|y)"/i)
if (!matches)return message.channel.send('invalid style, try doing: \n"msg to be reminded","time","in seconds, minutes, etc, and do it with the first charicter, e.g. s"');
let timeTimed;
switch (matches[3]) {
    case 's':
        timeTimed = 1000
        break;
    case 'm':
        timeTimed = 60000
    break;
    case 'h':
        timeTimed = 3.6000E+6
    break;
    case 'd':
        timeTimed = 86400000
    break;
    case 'y':
        timeTimed = 3.1536E+10
    break;
}
let time = matches[2] * timeTimed
    if (!time) {
        return message.inlineReply("`❌` Please provide a time!");
    }

    const reminder = matches[1]

    const remindEmbed = new MessageEmbed()
        .setTitle("`✅` Remind Set")
        .addField("Reminder:", `${reminder}`)
        .addField("Timeout", `${matches[2]} ${matches[3]}`)

    message.channel.send(remindEmbed)

    setTimeout(()=> {
        const finRemindEmbed = new MessageEmbed()
            .setTitle("`🚨` Reminder!!!")
            .setDescription(`**${reminder}**`)

        message.member.send(finRemindEmbed)
    }, time)
}}