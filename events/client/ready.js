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

		/*    will work on tomorrow
		
		client.getIdFromMentions = (string) => {
			// The id is the first and only match found by the RegEx.
			const matches = string.match(/^<#(\d+)>$/g);
		  console.log(matches)
			// If supplied variable was not a mention, matches will be null instead of an array.
			if (!matches) return;
		  
			// However, the first element in the matches array will be the entire mention, not just the ID,
			// so use index 1.
			const id = matches[1];
		  
			return client.users.cache.get(id);
		  }

		  */
		readyTable.addRow('Name:', client.user.username),
			readyTable.addRow('Servers:', client.guilds.cache.size + ' Cached'),
			readyTable.addRow('Users:', client.users.cache.size + ' Cached'),
			readyTable.addRow('Commands:', `${client.commands.size - 1} Loaded`),
			readyTable.addRow('Channels:', client.channels.cache.size + ' Cached');
		console.log(readyTable.toString());

		client.awaitMessage = (channelId, filter, max, time) => {
			const channel = client.channels.cache.get(channelId)
			if (!channel) throw new Error(`Invalid Id:\nThe Id ${channelId} is not a valid id`)
			else {
				return channel.awaitMessages(filter, { max, time, errors: ['time'] })
			}
		}

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

		client.user.setActivity(`m.help | In ${client.guilds.cache.size} Servers! and ${client.users.cache.size} Users!`, { type: 'LISTENING'})
		})
		client.manager.init(client.user.id);
	},
	
};
