const mongo = require('@misc/mongo');
const guildSchema = require('@schemas/guildSchema');

module.exports.getChannelId = (guildId) => {
	const result = guildSchema.findOne({ guildId });
	return result.modLogs ? result.modLogs.channelId : false;
};
module.exports.switchIt = async (guildId, channelId) => {
	const alreadyEnabled = this.getChannelId(guildId);
	let result;
	if (!alreadyEnabled) {
		result = await guildSchema.findOneAndUpdate(
			{
				guildId,
			},
			{
				guildId,
				$set: {
					modLogs: {
						channelId,
					},
				},
			},
			{
				upsert: true,
				new: true,
			}
		);
	} else {
		result = await guildSchema.findOneAndUpdate(
			{
				guildId,
			},
			{
				guildId,
				$set: {
					modLogs: false,
				},
			},
			{
				upsert: true,
				new: true,
			}
		);
	}
	return alreadyEnabled ? 'disabled it' : 'enabled it';
};
