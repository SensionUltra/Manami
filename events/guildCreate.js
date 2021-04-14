const { getPrefix } = require('../modules/settings/guild');
module.exports = {
    name: 'guildCreate',
    run: async(guild, client) => {
        const { id: guildId } = guild;
		const prefix = await getPrefix(guildId);
		if (prefix) {
			guild.prefix = prefix;
		} else {
			guild.prefix = config.prefix;
		}
    }
}