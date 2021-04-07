const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "cat",
description: "get a nice cat image!",
cooldown: 25000,
run: async(client, message, args) => {

    let kat = await axios.get('https://api.thecatapi.com/v1/images/search')
    .then((res) => {
        let fields;
        if (res.data[0].breeds[0]) {
            const { name, life_span, temperament, description } = res.data[0].breeds[0]
            fields = (
                {name: 'name', value: name},
                {name: 'life span', value: life_span},
                {name: 'about', value: temperament},
                {name: 'description', value: description}
            )
        } else {
            fields = (
                {name: 'A cat', value: 'yes, its true'}
            )
        }
        const cat = new MessageEmbed()
        .setTitle("Kitty 😺")
        .setURL(res.data[0].url)
        .setImage(res.data[0].url)
        .addFields(fields)
        .setTimestamp()
        .setFooter(`Requested By ${message.author.username}`)

        message.channel.send(cat)
    }).catch((e) => {
        console.log(e)
    })
}
}