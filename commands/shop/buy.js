const fs = require('fs')
const economy = require('../../economy');
const shop = require('../../shop')
const embed = require('../../embeds')
module.exports = {
name: "buy",
description: "buy stuff from the shop",
run: async(client, message, args) => {
    const itemArgs = args.join(' ')
    if (!itemArgs) return embed.error('MIssing Arguments', 'you need to give me a item to buy', message)
    const guildId = message.guild.id
    const userId = message.author.id
    const usersCoins = await economy.getCoins(guildId, userId)
    let noItem = true;
    if (usersCoins <= 0) return embed.error('you dont have any money to buy anything!')
    fs.readFile('./shop.json', 'utf8', (err, data) => {
        if (err) {
            embed.error('Command Failed', 'there was a error executing that cmd, could you please try again later', message)
            return console.log(err)
        } else {
            const items = JSON.parse(data);
            items.forEach( async(obj) => {
                if (obj.name != itemArgs) return

                if (obj.price > usersCoins) return embed.error('Not Enough Money', `you do not have enough money to buy this item, you would need ${obj.price} coins and you have ${usersCoins} coins!`, message)
                const item = obj
                const newCoins = await shop.buyItem(guildId, userId, item)

                noItem = false
                embed.succes('Congratulations!', `you bought ${obj.name} for ${obj.price} coins, now you have ${newCoins}`, message)
            });
            if (noItem) return embed.error('Not A Item', 'that is not a existing item', message)
        }
    })
}
}