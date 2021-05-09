module.exports = {
	name: 'guildMemberAdd',
	run: (member, client, getChannelId) => {
		const channelId = getChannelId(member.guild.id);
		if (!channelId) return;

		client.channels.cache.get(channelId).send(`${member.user.username} joined`);
	},
};
