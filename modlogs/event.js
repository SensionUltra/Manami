const { getChannelId } = require('../modules/settings/modlogs');

module.exports = (client) => {
	module.exports.newLog = (eventName, run) => {
		client.on(eventName, (...args) => run(...args, client, getChannelId));
	};
};
