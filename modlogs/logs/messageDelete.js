const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'messageDelete',
	run: async(message, client, getChannelId) => {
        const channelId = await getChannelId(message.guild.id);
        if (!channelId) return;
        if(message.author.bot) return;
		const embed = new MessageEmbed()
        .setTitle("`❌` Message Deleted")
        .setDescription(`**Message sent by ${message.author} deleted in <#${message.channel.id}>**\n${message.content}`)
        .setTimestamp()
        .setFooter(`Author ID: ${message.author.id} Message ID: ${message.id}`)

        client.channels.cache.get(channelId).send(embed);

	},
};
