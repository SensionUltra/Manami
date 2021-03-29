const { MessageEmbed } = require("discord.js");
const moment = require('moment');
module.exports = {
name: "whois",
description: "gets info about a user",
run: (client, message, args) => {
const target = message.mentions.users.first() || message.author;
const targetMember = message.mentions.members.first() || message.member;
const joinDiscord = moment(target.createdAt).format('llll');
const joinServer = moment(target.joinedAt).format('llll');

const fields = [
    {name: `Created At`, value: `${joinDiscord}`, inline: true},
    {name: `Joined At`, value: `${joinServer}`, inline: true},
    {name: `Roles`, value: targetMember.roles.cache.map(r => `${r}`).join(' | ')},
]

switch (true) {
case (target.id == 817653964161548289):
    fields.push(
        {name: `Acknowledgements`, value: `The Manami Bot`}
    )
break;
case (target.id == 537117477721604096):
    fields.push(
        {name: `Acknowledgements`, value: `Manami Bot Developer`}
    )
    break;
    case (target.id == 712170999222632469):
        fields.push(
            {name: `Acknowledgements`, value: `Manami Bot Developer`}
    )
}
const targetEmbed = new MessageEmbed()
.setTitle(`${target.username}`)
.setURL(target.displayAvatarURL({ dynamic: true, size: 1024 }))
.setAuthor(`${target.username}`, target.displayAvatarURL({ dynamic: true, size: 1024 }))
.setThumbnail(target.displayAvatarURL({ dynamic: true, size: 1024 }))
.setDescription(target)
.addFields(fields)
.setFooter(`ID: ${target.id}`)
.setTimestamp()

message.channel.send(targetEmbed)
}
}