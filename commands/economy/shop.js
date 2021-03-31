const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const economy = require('../../economy');
module.exports = {
name: "shop",
description: "buy stuff from the shop",
run: async(client, message, args) => {
    const item = args[0]
    if (!item) return message.channel.send('you need to give me a item to buy')
    const guildId = message.guild.id
    const userId = message.author.id
    const usersCoins = await economy.getCoins(guildId, userId)
    if (usersCoins <= 0) return message.channel.send('you dont have any money to buy anything!')
    fs.readFile('./shop.json', 'utf8', (err, data) => {
        if (err) {
            message.channel.send('there was a error executing that cmd, could you please try again later')
            return console.log(err)
        } else {
            const items = JSON.parse(data);
            items.forEach( async(obj) => {
                if (obj.name != item) return

                if (obj.price > usersCoins) return message.channel.send(`you do not have enough money to buy this item, you would need ${obj.price} coins and you have ${usersCoins} coins!`)
                const coinsPreNegative = obj.price
                const newCoins = await economy.takeCoins(guildId, userId, coinsPreNegative)

                message.channel.send(`congratulations, you bought ${obj.name} for ${obj.price} coins, now you have ${newCoins}`)
            });
        }
    })
}
}