const modlogs = require('../../modules/settings/modlogs');
module.exports = {
	name: 'modlog',
	description: 'disables/enables the modlogs',
	run: async (client, message, args) => {
		let channelid = (message.mentions.channels.first() || message.channel.id)
		let alreadyEnabled = (await modlogs.getChannelId(message.guild.id)) ? true : false;
		const result = await modlogs.switchIt(message.guild.id, channelid, alreadyEnabled);
		message.channel.send('done\n' + result);
	},
};
