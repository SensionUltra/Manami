const { MessageEmbed } = require("discord.js");
module.exports = {
name: "whois",
description: "gets info about a user",
run: (client, message, args) => {
const target = message.mentions.users.first() || message.author;

const fields = [
    {name: `Username`, value:`${target.username}`, inline: true}
]

fields.push(
    {name: `test`, value: `testing`}
)

const targetEmbed = new MessageEmbed()
.setTitle(`${target.username}`)
.setURL(target.displayAvatarURL({ dynamic: true, size: 1024 }))
.addFields(fields)

message.channel.send(targetEmbed)
}
}