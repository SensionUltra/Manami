const { getChannelId } = require('../modules/settings/modlogs');
const fs = require('fs')
module.exports = (client) => {
	fs.readdirSync('./modlogs/logs').forEach(file => {
const log = require(`./logs/${file}`)
console.log(log)
		client.on(log.name, (...args) => log.run(...args, client, getChannelId));
	})
};
