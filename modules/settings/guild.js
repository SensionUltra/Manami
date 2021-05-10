const mongo = require('@misc/mongo')
const guildSchema = require('@schemas/guildSchema')



module.exports.getAllPrefixes = async () => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.find({
                __v: 0
            })
            return result
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getPrefix = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.findOne({
                guildId,
})

            return result?.prefix
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.setPrefix = async (guildId, prefix) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.findOneAndUpdate({
                guildId,
            }, {
                guildId,
                $set: {
                    prefix,
                }
            }, {
                upsert: true,
                new: true
            })

            return result.prefix
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.setWelcome = async (guildId, channelId, message) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.findOneAndUpdate({
                guildId,
            }, {
                guildId,
                $set: {
                    welcome: {
                        channelId,
                        message,
                    }
                }
            }, {
                upsert: true,
                new: true
            })

            return result.welcome.message
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getWelcome = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.findOne({
                guildId,
})

            return result?.welcome
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.setLeave = async (guildId, channelId, message) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.findOneAndUpdate({
                guildId,
            }, {
                guildId,
                $set: {
                    leave: {
                        channelId,
                        message,
                    }
                }
            }, {
                upsert: true,
                new: true
            })

            return result.leave.message
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.resetLeave = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.findOneAndUpdate({
                guildId,
            }, {
                guildId,
                $set: {
                    leave: false
                }
            }, {
                upsert: true,
                new: true
            })

            return false
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.resetWelcome = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.findOneAndUpdate({
                guildId,
            }, {
                guildId,
                $set: {
                    welcome: false
                }
            }, {
                upsert: true,
                new: true
            })

            return true
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getLeave = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            const result = await guildSchema.findOne({
                guildId,
})

            return result?.leave
        } finally {
            mongoose.connection.close()
        }
    })
}