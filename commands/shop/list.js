const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const embed = require('@auto/embeds')
module.exports = {
name: "list",
description: "list the items that you can buy from the shop",
run: async(client, message, args) => {
    const guildId = message.guild.id
    const userId = message.author.id
    fs.readFile('./shop.json', 'utf8', (err, data) => {
        if (err) {
            embed.error('Command Failed', 'there was a error executing that cmd, could you please try again later', message)
            return console.log(err)
        } else {
            const itemsList = [];
            const items = JSON.parse(data);
            items.forEach(obj => {
        itemsList.push(
            {name: `${obj.name}`, value: `Price: ${obj.price}\nDescription: ${obj.description}`}
        )
            });
            embed.fieldListEmbed('Items To Buy From The Shop', itemsList, message)
        }
    })
}
}