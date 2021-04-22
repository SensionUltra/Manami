const shop = require('@eco/shop')
const embed = require('@auto/embeds')
module.exports = {
name: "items",
description: "see how many items you have",
run: async(client, message, args) => {
    const target = message.mentions.users.first() || message.author
    const guildId = message.guild.id
    const userId = target.id
    const items = await shop.getItems(guildId, userId)
const itemsList = []
const itemsAmount = {}
let itemsProcessed = 0
    if (!items || !items.length) return embed.error('No Items', 'you do not have any items', message)
items.forEach(item => {
    if (itemsList.some(i=>i.name == item.name)) return
    if (!itemsAmount[`${item.name}-${item.description}`]) itemsAmount[`${item.name}-${item.description}`] = 0
    itemsAmount[`${item.name}-${item.description}`]++ 
    itemsProcessed++
    // itemsList.push(
    //     {name: `${obj.name}`, value: `${obj.description}`}
    // )
})
if (itemsProcessed == items.length) {
    items.forEach(item => {
        if (itemsList.some(i=>i.name == item.name)) return
    itemsList.push(
        {name: `${item.name}`, value: `${item.description}\nAmount: ${itemsAmount[`${item.name}-${item.description}`]}`}
    )
    })
    embed.fieldListEmbed(target.username, itemsList, message)
}
}
}