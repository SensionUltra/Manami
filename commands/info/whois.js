const { MessageEmbed } = require("discord.js");
module.exports = {
name: "whois",
description: "gets info about a user",
run: (client, message, args) => {
const target = message.mentions.users.first() || message.author;

const fields = [
    {name: `Roles`, value: `testing`, inline: true}
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
.setDescription(target)
.addFields(fields)

message.channel.send(targetEmbed)
}
}