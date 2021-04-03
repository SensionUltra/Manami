const { MessageEmbed } = require("discord.js")

module.exports = {
name: "info",
aliases: ["about"],
description: "Shows information about the Bot",
run: (client, message, args) => {

        let serv = client.guilds.cache.size;
        let totalSeconds = client.uptime / 1000;
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;


    const fields = [
        {name: "Name:", value: client.user.username, inline: true},
        {name: "Servers:", value: client.guilds.cache.size, inline: true},
        {name: "Users:", value: client.users.cache.size, inline: true},
        {name: "Last Reboot:", value: `${uptime} ago`, inline: true},
        {name: "Commands:", value: `${client.commands.size - 1} Loaded`, inline: true},
        {name: "Developers:", value: `<@712170999222632469>, <@537117477721604096>`, inline: true}
    ]
    const infoembed = new MessageEmbed()
    .setTitle('Bot Information')
    .addFields(fields)

    message.channel.send(infoembed)
    message.channel.send("\`\`Website:\`\` https://manamibot.xyz")
}
}