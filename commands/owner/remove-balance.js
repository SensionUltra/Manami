const economy = require('@eco/economy')
module.exports = {
name: "remove-balance",
aliases: ['removebal', 'removebalance'],
description: "remove mone",
owner: true,
run: async(client, message, args) => {

    const target = message.mentions.users.first()

    if (!target) {
        message.reply("Please mention a user to remove coins")
        return
    }

    const coinsPreNegative = args[1]
    if (isNaN(coinsPreNegative)) {
    message.reply("Please provide a valid number of coins")
    return
    }

    const guildId = message.guild.id
    const userId = target.id

    const newCoins = await economy.takeCoins(guildId, userId, coinsPreNegative)

    message.channel.send(`You have removed ${coinsPreNegative} coins(s) from <@${userId}>. They now have ${newCoins} coins(s)!`)

},
}