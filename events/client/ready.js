const fs = require('fs')
const { getAllPrefixes } = require('@settings/guild');
const config = require('@root/config.json');
const ascii = require('ascii-table');
const Discord = require('discord.js')
const { Collection, MessageEmbed } = require('discord.js');
let readyTable = new ascii('Client');
const AutoPoster = require('topgg-autoposter')

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
        const ap = AutoPoster(process.env.TOPGGTOKEN, client)
        ap.on('posted', () => {
          console.log('Posted stats to Top.gg!')
        })
		 client.config = config
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

		if (client.user.id == 828753390216806410) {
			client.config.prefix = 'd.'
			process.env.MONGOSTRING = process.env.DEVMONGOSTRING
		}
		allPrefixs = await getAllPrefixes();
		client.guilds.cache.forEach((guild) => {
			allPrefixs.forEach((obj) => {
				if (obj.guildId == guild.id) {
					guild.prefix = obj.prefix;
				}
			});
			if (!guild.prefix) guild.prefix = client.config.prefix;
		});
		client.modules = new Collection()
		client.package = require('@root/package.json')
		fs.readdirSync('./modules/').forEach(folder => { //  add all the modules to the client object as a collection
			fs.readdirSync(`./modules/${folder}`).forEach(file => {
				const pull = require(`../../modules/${folder}/${file}`)
				const fileName = file.split('.').shift()
				client.modules.set(fileName, pull)
			})
		client.supportServer = client.guilds.cache.get('826614093695811594')
		client.supportServer.reportChannel = client.supportServer.channels.cache.get('827075339980111925')
		client.user.setActivity(`m.help | In ${client.guilds.cache.size} Servers! and ${client.users.cache.size} Users!`, { type: 'LISTENING'})
		});
		client.api.applications(client.user.id).commands.post({
			data: {
				name: 'hello',
				description: 'responds with hello world!'
			}
		});
		client.api.applications(client.user.id).commands.post({
			data: {
				name: 'echo',
				description: 'repeats your text as embed',

				options: [
					{
						name: 'content',
						description: 'the content of the embed',
						type: 3,
						required: true,
					}
				]
			}
		});
		client.api.applications(client.user.id).guilds('789800070895763476').commands.post({
			data: {
				name: 'ping',
				description: 'get the bots ping!',
				
			}
		})

		client.ws.on('INTERACTION_CREATE', async interaction => {
			const command = interaction.data.name.toLowerCase();
			const args = interaction.data.options;
			// [ {name: "content", value: "userinput"} ]

			if(command == 'hello') {
				client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							content: "Hello World!"
						}
					}
				})
			}

			if(command == "echo") {
				const description = args.find(arg => arg.name.toLowerCase() == "content").value;
				const embed = new MessageEmbed()
				.setTitle("Echo!")
				.setDescription(description)
				.setAuthor(interaction.member.user.username);

				client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: await createAPIMessage(interaction, embed)
					}
				})

			if(command == "ping") {
				client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							content: `pong`
						}
					}
				})
			}

				
			}
		})

		async function createAPIMessage(interation, content) {
			const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interation.channel_id), content)
			.resolveData()
			.resolveFiles();

			return { ...apiMessage.data, files: apiMessage.files };
		}

		
		client.manager.init(client.user.id);
	},
	
};
