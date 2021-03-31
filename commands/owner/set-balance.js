const economy = require('../../economy')
module.exports = {
name: "set",
aliases: ['setbal', 'setbalance'],
description: "set mone",
owner: true,
run: async(client, message, args) => {

    const target = message.mentions.users.first()

    if (!target) {
        message.reply("Please mention a user to set coins")
        return
    }

    const coins = args[1]
    if (isNaN(coins)) {
    message.reply("Please provide a valid number of coins")
    return
    }

    const guildId = message.guild.id
    const userId = target.id

    const newCoins = await economy.setCoins(guildId, userId, coins)

    message.channel.send(`You have set ${coins} coins(s) to <@${userId}>. They now have ${newCoins} coins(s)!`)

},
}