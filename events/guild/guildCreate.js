const { getPrefix } = require('@settings/guild');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const moment = require('moment')
module.exports = {
    name: 'guildCreate',
    run: async(guild, client) => {
        const { id: guildId } = guild;
		const prefix = await getPrefix(guildId);
		if (prefix) {
			guild.prefix = prefix;
		} else {
			guild.prefix = config.prefix;
		}

		const bot = client.user

		const onJoinChannel = client.channels.cache.get("831010644890615829")

		const onJoinEmbed  = new MessageEmbed()
		.setTitle(":clap: New Server Join! :clap: ")
		.addField("Guild", "```" + guild.name + "```")
		.addField("Server Region", "```" + guild.region + "```", true)
		.addField("Guild ID", "```" + guild.id + "```", true)
		.addField("Guild Owner ID", "```" + guild.ownerID + "```", true)
		.addField("Guild Members", "```" + guild.memberCount + "```", true)
		.addField("When Joined", "```" + moment(bot.joinedAt).format('llll') + "```", true)

		

		onJoinChannel.send(onJoinEmbed)
	
    }
}