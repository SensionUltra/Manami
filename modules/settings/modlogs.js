const mongo = require('@misc/mongo');
const guildSchema = require('@schemas/guildSchema');

module.exports.getChannelId = async (guildId) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await guildSchema.findOne({ guildId });
            if(!result)return false;
			return result.modLogs ? result.modLogs.channelId : false;
		} finally {
			mongoose.connection.close();
		}
	});
};
module.exports.switchIt = async (guildId, channelId, alreadyEnabled) => {
	return await mongo().then(async (mongoose) => {
		try {
			// const thing = await guildSchema.findOne({ guildId });
			// console.log(thing);
			// console.log(thing.modlogs);
			// console.log(thing[0]?.modlogs);
			// const alreadyEnabled = thing?.modLogs == false ? false : true;
			let result;
			// if (alreadyEnabled == false) {
			if (alreadyEnabled) {
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
			} else {
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
			}
			return alreadyEnabled == false ? 'enabled it' : 'disabled it';
		} finally {
			mongoose.connection.close();
		}
	});
};
