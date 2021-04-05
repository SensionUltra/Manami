const { MessageEmbed } = require("discord.js");
const moment = require('moment');
module.exports = {
name: "whois",
description: "gets info about a user",
cooldown: 3000,
run: (client, message, args) => {
const target = message.mentions.users.first() || client.users.cache.find(user => user.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.cache.get(args[0]) || message.author
const targetMember = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
const joinDiscord = moment(target.createdAt).format('llll');
const joinServer = moment(target.joinedAt).format('llll');
if (target.bot == true) {
    target.isbot = 'yes'
} else {
    target.isbot = 'no'
}


let status;
switch (target.presence.status) {
    case "online":
        status = "<:onlinestat:806751831719804955>";
        break;
    case "offline":
        status = "<:offlinestat:806752213397143562>";
        break;
    case "idle":
        status = "<:idlestat:806751406613594112>";
        break;
    case "dnd":
        status = "<:dndstat:806752021780234271>";
        break;
}

const fields = [
    {name: `Created At`, value: joinDiscord, inline: true},
    {name: `Joined At`, value: joinServer, inline: true},
    {name: `Status`, value: status, inline: true},
    {name: `Bot`, value: target.isbot, inline: true},
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