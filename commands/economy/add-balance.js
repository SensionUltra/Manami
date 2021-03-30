const economy = require('../../economy')

module.exports = {
name: "give",
aliases: ['addbal', 'addbalance'],
description: "give mone",
run: async(client, message, args) => {
    const author = message.author
    if(author != "712170999222632469") {
        message.channel.send(`Only <@712170999222632469> and <@537117477721604096> can run this command`)
        return
    }
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

    message.reply(`You have given <@${userId}> ${coins} coins(s). They now have ${newCoins} coins(s)!`)

},
}