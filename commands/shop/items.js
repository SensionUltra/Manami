const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const economy = require('../../economy');
const shop = require('../../shop')
module.exports = {
name: "items",
description: "see how many items you have",
run: async(client, message, args) => {
    const target = message.mentions.users.first() || message.author
    const guildId = message.guild.id
    const userId = target.id
    const items = await shop.getItems(guildId, userId)
const itemsList = []
    if (!items) return message.channel.send('you do not have any items')
items.forEach(obj => {
    if (itemsList.some(i=>i.name == obj.name)) return
    itemsList.push(
        {name: `${obj.name}`, value: `${obj.description}`}
    )
});
const itemsEmbed = new MessageEmbed()
    .setTitle(`${target.username}`)
    .addFields(itemsList)
    message.channel.send(itemsEmbed)
}
}