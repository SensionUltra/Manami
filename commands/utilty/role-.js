module.exports = {
    name: "role-",
    aliases: ["removerole", "remrole"],
    description: "remove a member's role",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) {
            message.reply("You are missing the \`\`MANAGE_ROLES\`\` Permission!")
            return
        }
        const target = message.mentions.users.first() || client.users.cache.find(user => user.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.cache.get(args[0])
        if (!target) {
        message.reply("PLease specify someone to remove their role")
        }
    
        args.shift()
    
        const roleName = args.join(' ')
        const { guild } = message
    
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            message.reply(`${roleName} is not valid`)
            return
        }

    
        const member = guild.members.cache.get(target.id)

        if(!member.roles.cache.get(role.id)) {
            message.channel.send(`${target} does not have the specified role`)
            return
        }

        member.roles.remove(role)
    
        message.channel.send(`Successfully removed ${roleName} role from ${target} !`)
    }
    }