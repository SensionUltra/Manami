const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'messageUpdate',
    run: async(oldMessage, newMessage, client, getChannelId) => {
        const channelId = await getChannelId(oldMessage.guild.id);
        if (!channelId) return;
        if(oldMessage.author.bot) return;
        const embed = new MessageEmbed()
        .setTitle("`📝` Message Edited")
        .setColor("GREEN")
        .setDescription(`Message edited in <#${oldMessage.channel.id}>[Jump To Message](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`)
        .addField("Before", oldMessage.content, true)
        .addField("After", newMessage.content, true)
        .setFooter(`ID: ${oldMessage.id}`)
        .setTimestamp()
        client.channels.cache.get(channelId).send(embed);
        
    }
}