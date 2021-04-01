const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const economy = require('../../economy');
const shop = require('../../shop')
module.exports = {
name: "list",
description: "list the items that you can buy from the shop",
run: async(client, message, args) => {
    const guildId = message.guild.id
    const userId = message.author.id
    fs.readFile('./shop.json', 'utf8', (err, data) => {
        if (err) {
            message.channel.send('there was a error executing that cmd, could you please try again later')
            return console.log(err)
        } else {
            const itemsList = [];
            const items = JSON.parse(data);
            items.forEach(obj => {
        itemsList.push(
            {name: `${obj.name}`, value: `Price: ${obj.price}\nDescription: ${obj.description}`}
        )
            });
            const listEmbed = new MessageEmbed()
            .setTitle(`Shop`)
            .addFields(itemsList)
            message.channel.send(listEmbed)
        }
    })
}
}