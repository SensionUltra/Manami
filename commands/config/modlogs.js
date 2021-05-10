const modlogs = require('../../modules/settings/modlogs');
module.exports = {
	name: 'modlog',
	description: 'disables/enables the modlogs',
	run: async (client, message, args) => {
		console.log('hello');
		console.log('sup');
		message.reply('sup');
		let alreadyEnabled = (await modlogs.getChannelId(message.guild.id)) ? true : false;
		const result = await modlogs.switchIt(message.guild.id, message.channel.id, alreadyEnabled);
		message.channel.send('done\n' + result);
	},
};
