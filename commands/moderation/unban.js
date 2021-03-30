const Discord = require('discord.js')

module.exports = {
name: "unban",
description: "unbans the target user",
run: (client, message, args) => {
const target = args.join(' ')
if (!target) return message.channel.send('Please send the id of a user to unban')
const targetUser = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.author
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