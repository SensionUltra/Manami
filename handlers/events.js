const ascii = require('ascii-table');
const fs = require('fs');
let eventTable = new ascii('Events');
eventTable.setHeading('Events', 'Load status');

module.exports = (client) => {
	fs.readdirSync('./events').forEach(folder => {
		const eventFiles = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith('.js'));
		for (const file of eventFiles) {
			const event = require(`../events/${folder}/${file}`);
			if (!event.name) {
				eventTable.addRow(file, `❌  -> missing a name, or the name is not a string.`);
				continue;
			} else if (event.name) {
				eventTable.addRow(file, `✅`);
                try {

                    client.on(event.name, (...args) => event.run(...args, client));
                } catch (e) {
                    console.error(e)
                }
			}
		}
	})
		console.log(eventTable.toString());
};
