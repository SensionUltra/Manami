const mongo = require('./mongo')
const profileSchema = require('./models/profileSchema')
module.exports = (client) => {
    client.on('message', message => {
        const { guild, member } = message

        // addXP(guild.id, member.id, 20, message)
    })
}

const getNeededXP = level => level * level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
    await mongo().then(async mongoose => {
        try {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                $inc: {
                    xp: xpToAdd
                }
            }, {
                upsert: true,
                new: true
            })
            const { xp, level } = result
            const needed = getNeededXP(level)

            if (xp >= needed) {
                ++level
                xp -= needed

                message.reply(`You are now level ${level} with ${xp}`)

                await profileSchema.updateOne({
                    guildId,
                    userId
                }, {
                    level,
                    xp
                })
            }
            console.log('RESULT:', result)
        } finally {
            mongoose.connection.close()
        }
    })
}