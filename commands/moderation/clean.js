const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "clean",
    aliases: ["cleanchannel"],
    description: "clean a given channel",
    usage: "clean <reason>",
    category: "utility",
    run: async(client, message, args) => {
        if(message.member.id !== message.guild.owner.id) {
             message.reply("You are aren't the server owner!")
             return
        }
        let reason = args.join(" ") || "No Reason"
        if(message.channel.id == message.guild.rulesChannelID) {
            message.reply("This channel cannot be cleaned, because it is a rules channel")
            return
        }
        if(message.channel.id == message.guild.publicUpdatesChannelID) {
            message.reply("This channel cannot be cleaned, because it is a public updates channel")
            return
        }
        let newchannel = await message.channel.clone()
        await message.channel.delete()
        let embed = new MessageEmbed()
        .setTitle(`BAM! \`${message.channel.name}\` **has been successfully cleaned**`)
        .setDescription(reason)
        .setImage('https://cdn.discordapp.com/attachments/828468268317802578/828468620157386783/tenor.gif')
        await newchannel.send(embed)
    }
}