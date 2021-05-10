module.exports = {
	name: 'guildMemberAdd',
	run: async(member, client, getChannelId) => {
		console.log('a member joined')
		const channelId = await getChannelId(member.guild.id);
		if (!channelId) return;

		client.channels.cache.get(channelId).send(`${member.user.username} joined`);
	},
};
