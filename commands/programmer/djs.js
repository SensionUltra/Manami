const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
name: "djs",
aliases: ["d.js"],
cooldown: 10000,
description: "search the discord.js docs",
run: async(client, message, args) => {

    const query = args.slice().join(' ')
    if(!query) return message.reply("Please specify a query to search for") // If no like query is uh provied
    const url = 'https://djsdocs.sorta.moe/v2/embed?src=stable&q=' + query // uh searches 

    let response
        try {
            response = await fetch(url).then(res => res.json())
        }
        catch (e) {
            return message.reply('An Error Occured, Try Again Later.')    
        }

        const pkg = response
        const embed = new MessageEmbed()
        .setColor('BLUE')
        .setThumbnail('https://cdn.discordapp.com/emojis/586438523796848640.png?v=1') // Discord.JS Thumbnail cuz yes
        .setAuthor(pkg.author.name, pkg.author.icon_url)
        .setDescription(pkg.description)
        .setTimestamp()
        if(pkg.fields) {embed.addFields(pkg.fields)}
        if(pkg.title) {embed.setTitle(pkg.title)}
        message.channel.send(embed)

}
}