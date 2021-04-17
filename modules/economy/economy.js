const mongo = require('@misc/mongo')
const profileSchema = require('@schemas/profileSchema')
const coinsCache = {}


module.exports.addCoins = async (guildId, userId, coins) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
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

module.exports.takeCoins = async (guildId, userId, coinsPreNegative) => {
    return await mongo().then(async (mongoose) => {
        try {
            let coins = (- + coinsPreNegative)
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
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

module.exports.begCoins = async (guildId, userId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const randomNumber = Math.floor(Math.random() * 500) + 1 ;
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                $inc: {
                    coins: randomNumber
                }
                }, {
                    upsert: true,
                    new: true
                })
                coinsCache[`${guildId}-${userId}`] = result.coins
            
                return randomNumber
            } finally {
    
                mongoose.connection.close()
            }
        })
    }

module.exports.setCoins = async (guildId, userId, coins) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $set: {
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

module.exports.getCoins = async (guildId, userId) => {
    const cachedValue = coinsCache[`${guildId}-${userId}`]
    if (cachedValue) {
        return cachedValue
    }
    return await mongo().then(async mongoose => {
        try {
            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            let coins = 0
            if (result) {
                coins = result.coins
            } else {
                await new profileSchema({
                    guildId,
                    userId,
                    coins
                }).save()
            }

            coinsCache[`${guildId}-${userId}`] = coins

            return coins
        } finally {
            mongoose.connection.close()
        }
    })
}