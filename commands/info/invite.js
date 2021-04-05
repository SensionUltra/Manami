const { MessageEmbed } = require("discord.js");
module.exports = {
name: "invite",
description: "gives the invite to invite the bot",
cooldown: 3000,
run: (client, message, args) => {
const inviteEmbed = new MessageEmbed()
.setTitle('Invite Manami Here!')
.setURL('https://discord.com/oauth2/authorize?client_id=817653964161548289&scope=bot&permissions=8');

message.channel.send(inviteEmbed)
}
}