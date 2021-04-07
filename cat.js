const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "cat",
description: "get a nice cat image!",
cooldown: 25000,
run: async(client, message, args) => {

    let kat = await axios.get('https://api.thecatapi.com/v1/images/search')
    .then((res) => {

        const cat = new MessageEmbed()
        .setTitle("Kitty 🐱")
        .setImage(res.data[0].url)
        .setTimestamp()
        .setFooter(`Requested By ${message.author.username}`)

        message.channel.send(cat)
    }).catch((e) => {
        console.log(e)
    })
}
}