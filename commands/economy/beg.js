const economy = require('@eco/economy');
module.exports = {
name: "beg",
description: "beg for coins",
run: async(client, message, args) => {
    const target = message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id


    const beggedCoins = await economy.begCoins(guildId, userId)

    return message.channel.send(`You begged and got ${beggedCoins} coins!`)
}
}