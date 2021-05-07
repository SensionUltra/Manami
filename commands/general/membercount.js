const { MessageEmbed } = require("discord.js")

module.exports = {
name: "membercount",
aliases: ["whatdamembers"],
description: "Check your guilds membercount!",

run: (client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle("Member Count")
    .addField("`👨🏼‍🤝‍👨🏻` Total:", `**${message.guild.memberCount}**`)
    .addField("`🤖` Bots", `**${message.guild.members.cache.filter(m => m.user.bot).size}**`)
    .addField("`🧍‍♂️` Users", `**${message.guild.members.cache.filter(m => !m.user.bot).size}**`)
    .setTimestamp()

    message.channel.send(embed)
}}