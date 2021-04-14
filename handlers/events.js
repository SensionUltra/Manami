const ascii = require('ascii-table');
const fs = require('fs');
let eventTable = new ascii('Events');
eventTable.setHeading('Events', 'Load status');

module.exports = (client) => {
	const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`../events/${file}`);
		if (!event.name) {
			eventTable.addRow(file, `❌  -> missing a name, or the name is not a string.`);
			continue;
		} else if (event.name) {
			eventTable.addRow(file, `✅`);
			client.on(event.name, (...args) => event.run(...args, client));
		}
	}
	console.log(eventTable.toString());
};
