const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "dog",
description: "get a nice dog image!",
cooldown: 25000,
run: async(client, message, args) => {

    let doggie = await axios.get('https://api.thedogapi.com/v1/images/search')
    .then((res) => {
const { name, life_span, temperament, bred_for } = res.data[0].breeds[0]
        const dog = new MessageEmbed()
        .setTitle("Doggy 🐶")
        .setURL(res.data[0].url)
        .setImage(res.data[0].url)
        .addFields(
            {name: 'name', value: name},
            {name: 'life span', value: life_span},
            {name: 'about', value: temperament},
            {name: 'bred for', value: bred_for},
        )
        .setTimestamp()
        .setFooter(`Requested By ${message.author.username}`)

        message.channel.send(dog)
    }).catch((e) => {
        console.log(e)
    })
}
}