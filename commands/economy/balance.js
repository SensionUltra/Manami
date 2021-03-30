const economy = require('../../economy')

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
    
    message.reply(`That user has ${coins} coins!`)
}
}