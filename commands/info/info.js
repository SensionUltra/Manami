const { MessageEmbed } = require("discord.js")
const os = require('os')
module.exports = {
name: "info",
aliases: ["about"],
description: "Shows information about the Bot",
run: (client, message, args) => {

    const core = os.cpus()[0]

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
        {name: "Developers:", value: `<@712170999222632469>, <@537117477721604096>`, inline: true},
        {name: "Channels Cached:", value: client.channels.cache.size},
        {name: "Platform", value: `${os.platform}`},
        {name: "CPU", value: `Cores: ${os.cpus().length}\nModel: ${os.cpus().map(i => `${i.model}`)[0]}\nSpeed: ${core.speed}MHz`},

    ]
    const infoembed = new MessageEmbed()
    .setTitle('Bot Information')
    .addFields(fields)

    message.channel.send(infoembed)
}
}