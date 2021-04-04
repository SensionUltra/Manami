module.exports = {
name: "role+",
aliases: ["giverole"],
description: "give a role to a member",
run: (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) {
        message.reply("You are missing the \`\`MANAGE_ROLES\`\` Permission!")
        return
    }
    const target = message.mentions.users.first() || client.users.cache.find(user => user.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.cache.get(args[0])
    if (!target) {
    message.reply("Please specify someone to give a role to")
    }

    args.shift()

    const roleName = args.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
        return role.name === roleName
    })
    if (!role) {
        message.reply(`There is role ${roleName} is not valid`)
        return
    }

    const member = guild.members.cache.get(target.id)

    if(member.roles.cache.get(role.id)) {
        message.channel.send(`${target} already has the specified role`)
        return
    }

    member.roles.add(role)

    message.channel.send(`Successfully given ${target} ${roleName} role!`)
}
}