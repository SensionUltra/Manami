const redis = require('../../redis')
const { prefix } = require('../../config.json')

module.exports = {
name: "mute",
aliases: ["shut"],
description: "mute a user",
run: async (client, message, args) => {
    const redisKeyPrefix = 'muted-'

    redis.expire(message => {
        if (message.startsWith(redisKeyPrefix)) {
            const split = message.split('-')

            const memberId = split[1]
            const guildId = split[2]

            const guild = client.guilds.cache.get(guildId)
            const member = guild.members.cache.get(memberId)
            
            const role = getRole(guild)

            member.roles.remove(role)

        }
    })

    const getRole = (guild) => {
        return guild.roles.cache.find((role) => role.name === "Muted")
    }
    const giveRole = member => {
        const role = getRole(member.guild)
                    if (role) {
                        member.roles.add(role)
                        console.log('Muted ' + member.id)
                    } 
    }
    const onJoin = async member => {
        const { id, guild } = member

        const redisClient = await redis()
        
        try {
            redisClient.get(`${redisKeyPrefix}${id}-${guild.id}`, (err, result) => {
                if (err) {
                    console.error('Redis GET error:', err)
                } else if (result) {
                    giveRole(member)
                } else {
                    console.log("The user is not muted")
                }
            })
        } finally {
            redisClient.quit()
        }
    }
    client.on('guildMemberAdd', member => {
        onJoin(member)
    })

    const syntax = `${prefix}mute <@> <duration as a number> <m, h, d, or life>`
    const { member, channel, content, mentions, guild } = message

    if (!member.hasPermission('MANAGE_ROLES')) {
        message.channel.send("You do not have permission to execute this command!")
        return
    }

    const split = content.trim().split(' ')

    if(split.length !== 4) {
        message.channel.send('Please use the correct command syntax: ' + syntax)
        return
    }

    const duration = split[2]
    const durationType = split[3]

    if (isNaN(duration)) {
        channel.send("Please provide a duration to mute the user " + syntax)
        return
    }

    const durations = {
        m: 60,
        h: 60 * 60,
        d: 60 * 60 * 24,
        life: -1
    }

    if  (!durations[durationType]) {
        channel.send("Please provide a valid duration type " + syntax)
        return
    }

    const seconds = duration * durations[durationType]

    const target = mentions.users.first()
    
    if(!target) {
        channel.send("Not a valid user")
        return
    }

    const { id } = target

    const Targetmember = guild.members.cache.get(id)
    giveRole(Targetmember)

    const redisClient = await redis()
    try {
        const redisKey = `${redisKeyPrefix}${id}-${guild.id}`

        if (seconds  > 0) {
            redisClient.set(redisKey, `true`, 'EX', 3) 
        } else {
            redisClient.set(redisKey, `true`) 
        }
    } finally {
        redisClient.quit()
    }


}
}