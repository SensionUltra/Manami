const { MessageEmbed } = require("discord.js")

module.exports = {
name: "membercount",
aliases: ["whatdamembers"],
description: "Check your guilds membercount!",

run: (client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle("Member Count")
    .setDescription(`**${message.guild.memberCount}** members!`)
    .setTimestamp()

    message.channel.send(embed)
}}