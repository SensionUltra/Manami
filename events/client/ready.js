const { getAllPrefixes } = require('@settings/guild');
const config = require('@root/config.json');
const ascii = require('ascii-table');
let readyTable = new ascii('Client');
readyTable.setHeading('Info', 'status');
module.exports = {
	name: 'ready',
	run: async (client) => {
		readyTable.addRow('Name:', client.user.username),
			readyTable.addRow('Servers:', client.guilds.cache.size + ' Cached'),
			readyTable.addRow('Users:', client.users.cache.size + ' Cached'),
			readyTable.addRow('Commands:', `${client.commands.size - 1} Loaded`),
			readyTable.addRow('Channels:', client.channels.cache.size + ' Cached');
		console.log(readyTable.toString());

		allPrefixs = await getAllPrefixes();
		client.guilds.cache.forEach((guild) => {
			allPrefixs.forEach((obj) => {
				if (obj.guildId == guild.id) {
					guild.prefix = obj.prefix;
				}
			});
			if (!guild.prefix) guild.prefix = config.prefix;
		});
	},
};
