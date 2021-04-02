const fs = require('fs')
const economy = require('@eco/economy');
const shop = require('@eco/shop')
const embed = require('@auto/embeds')
module.exports = {
name: "buy",
description: "buy stuff from the shop",
run: async(client, message, args) => {
    const itemArgs = args.join(' ')
    if (!itemArgs) return embed.error('Missing Arguments', 'you need to give me a item to buy', message) // checks whether the user gave the right amount of args
    const guildId = message.guild.id
    const userId = message.author.id
    const usersCoins = await economy.getCoins(guildId, userId) // checks how many coins the user has
    if (usersCoins <= 0) return embed.error('Not Enough Coins', 'you dont have any money to buy anything!', message) // checks if the user has 0 or less coins and if so then tells the user
    fs.readFile('./shop.json', 'utf8', (err, data) => { // reads from the file that stors the items
        if (err) {
            embed.error('Command Failed', 'there was a error executing that cmd, could you please try again later', message) // tells the user if there was a error reading from the file becuse that can happen
            return console.log(err)
        } else {
            const items = JSON.parse(data); // parses the data from the readfile
            items.forEach( async(obj) => {
                const { price, name } = obj
                if (name != itemArgs) return //  checks whether this is the right item to buy
                if (price > usersCoins) return embed.error('Not Enough Money', `you do not have enough money to buy this item, you would need ${price} coins and you have ${usersCoins} coins!`, message) //  if the user dosnt have enough coins it will tell the user how many coins they need
                
                const item = obj // defines the object with a nicer name
                const newCoins = await shop.buyItem(guildId, userId, item) // buys the item from the shop
                embed.succes('Congratulations!', `you bought ${obj.name} for ${obj.price} coins, now you have ${newCoins}`, message) // tells the user info about what they bought
            });
        }
    })
}
}