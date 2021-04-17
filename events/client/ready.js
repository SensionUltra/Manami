const fs = require('fs')
const { getAllPrefixes } = require('@settings/guild');
const config = require('@root/config.json');
const ascii = require('ascii-table');
const { Collection } = require('discord.js');
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
if (client.user.id == 828753390216806410) config.prefix = 'd.'
		allPrefixs = await getAllPrefixes();
		client.guilds.cache.forEach((guild) => {
			allPrefixs.forEach((obj) => {
				if (obj.guildId == guild.id) {
					guild.prefix = obj.prefix;
				}
			});
			if (!guild.prefix) guild.prefix = config.prefix;
		});
		client.modules = new Collection()
		client.package = require('@root/package.json')
		fs.readdirSync('./modules/').forEach(folder => { //  add all the modules to the client object as a collection
			fs.readdirSync(`./modules/${folder}`).forEach(file => {
				const pull = require(`../../modules/${folder}/${file}`)
				const fileName = file.split('.').shift()
				client.modules.set(fileName, pull)
			})
		})
	},
};
