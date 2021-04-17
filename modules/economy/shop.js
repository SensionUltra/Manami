const mongo = require('@misc/mongo')
const profileSchema = require('@schemas/profileSchema')
const coinsCache = {}

module.exports.buyItem = async (guildId, userId, item) => {
    return await mongo().then(async (mongoose) => {
        try {
            const coins = (- + item.price)
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $push: {
                    items: item
                },
                $inc: {
                    coins
                }
            }, {
                upsert: true,
                new: true
            })

            coinsCache[`${guildId}-${userId}`] = result.coins
            
            return result.coins
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getItems = async (guildId, userId) => {
    return await mongo().then(async mongoose => {
        try {
            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            const items = result?.items
            return items
        } finally {
            mongoose.connection.close()
        }
    })
}