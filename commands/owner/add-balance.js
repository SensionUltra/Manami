const economy = require('../../economy')
module.exports = {
name: "give",
aliases: ['addbal', 'addbalance'],
description: "give mone",
// owner: 'Only the owners of the bot can run this command',
owner: false,
run: async(client, message, args) => {

    const target = message.mentions.users.first()

    if (!target) {
        message.reply("Please mention a user to give coins")
        return
    }

    const coins = args[1]
    if (isNaN(coins)) {
    message.reply("Please provide a valid number of coins")
    return
    }

    const guildId = message.guild.id
    const userId = target.id

    const newCoins = await economy.addCoins(guildId, userId, coins)

    message.channel.send(`You have given <@${userId}> ${coins} coins(s). They now have ${newCoins} coins(s)!`)

},
}