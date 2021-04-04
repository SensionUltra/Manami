module.exports = {
name: "nickname",
aliases: ["nick"],
description: "nickname a user",
run: async(client, message, args) => {
    if(!message.member.hasPermission('MANAGE_NICKNAMES')) {
        message.reply("You are missing the \`\`MANAGE_NICKNAMES\`\` permission!")
        return
    }
    
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const nickName = args.slice(1).join(" ");

    if(!args[0]) return message.channel.send("You must specify a member to change their nickname")
    if(!target) return message.channel.send('Member specified is not in this guild')
    if (!nickName) return message.channel.send("You must specify a nickname")
    if (!target.kickable) return message.channel.send("I cannot change that members nickname as their role is higher than mine")

    await target.setNickname(nickName).catch(e => console.log(e) && message.channel.send(`I was unable to change ${target} nickname`))
}
}