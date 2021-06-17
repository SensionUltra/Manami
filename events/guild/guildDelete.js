const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'guildDelete',
    run: async(guild, client) => {


		const onLeaveChannel = client.channels.cache.get("832838373081219072")

		const onLeaveEmbed  = new MessageEmbed()
		.setTitle(":cry: Server Left :cry:")
		.addField("Guild", "```" + guild.name + "```")
		.addField("Server Region", "```" + guild.region + "```", true)
		.addField("Guild ID", "```" + guild.id + "```", true)
		.addField("Guild Owner ID", "```" + guild.ownerID + "```", true)
		.addField("Guild Members", "```" + guild.memberCount + "```", true)

		
    if (onLeaveChannel)onLeaveChannel.send(onLeaveEmbed)

    }}