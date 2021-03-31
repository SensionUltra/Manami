const Discord = require('discord.js')

module.exports = {
name: "unlock",
description: "unlock a channel for other members",
run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You are missing the \`MANAGE_CHANNELS\` permission')
    if(!args[0]) return message.channel.send("You must mention a channel");
    if(!message.mentions.channels.first()) return message.channel.send('You did not mention a valid channel');

    const lockRole = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone")

    await message.mentions.channels.forEach(async channel => {
        if (!channel.name.startsWith('🔐')) return message.channel.send("Channel is already unlocked");
        await channel.setName(channel.name.substring(1));
        try {
            await channel.updateOverwrite(lockRole, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true
            });
            message.channel.send(`<#${channel.id}> has been successfully unlocked`)
        } catch (e) {
            console.log(e);
            message.channel.send("Something went wrong with unlocking the channels.")
        }
    })



}
}