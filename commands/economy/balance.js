const economy = require('@eco/economy')
const { MessageEmbed } = require("discord.js");
module.exports = {
name: "balance",
aliases: ["bal", "howmuchmoneyigot"],
description: "See how much coins you have",
run: async(client, message, args) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id


    const coins = await economy.getCoins(guildId, userId)
    
    const balanceEmbed = new MessageEmbed()
    .setTitle(`${target.username}'s balance`)
    .setDescription(`${target.username} has ${coins} coins!`)
    .setTimestamp()

    message.channel.send(balanceEmbed)
}
}