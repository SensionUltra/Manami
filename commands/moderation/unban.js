const Discord = require('discord.js')

module.exports = {
name: "unban",
description: "unbans the target user",
run: (client, message, args) => {
const target = args.join(' ')
if (!target) return message.channel.send('Please send the id of a user to unban')
const targetUser = client.users.cache.get(`${target}`) || target
message.guild.members.unban(target).catch((err) => {
    if (err) {
        return message.channel.send('I could not unban the user, this could be becuse you did not provide a valid id, the user is not banned from this guild if none of that is the case then try again in a bit');
    }
    console.log('if you can see this, youv screwed up')
});
const unBannedEmbed = new Discord.MessageEmbed()
.setColor(`#ff0000`)
.setTitle(`${targetUser?.username}`)
.addField(`Unbanned by`, `${message.author}`)
message.channel.send(unBannedEmbed)
}
}