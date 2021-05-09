const modlogs = require('../../modules/settings/modlogs');
module.exports = {
	name: 'modlog',
	description: 'disables/enables the modlogs',
	run: async (client, message, args) => {
		const result = modlogs.switchIt(message.guild.id, message.channel.id);
		message.channel.send(result || 'done');
	},
};
