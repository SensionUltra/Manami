const embed = require('@auto/embeds')
module.exports = {
    name: "role-",
    aliases: ["removerole", "remrole"],
    description: "remove a member's role",
    run: (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) {
            embed.error('Missing Permissions', "You are missing the \`MANAGE_ROLES\` Permission!", message)
            return
        }
        const target = message.mentions.users.first() || client.users.cache.find(user => user.username.toLowerCase() === args.join(" ").toLowerCase()) || client.users.cache.get(args[0])
        if (!target) {
        embed.error('Missing Arguments', "Please specify someone to remove their role", message)
        }
    
        args.shift()
    
        const roleName = args.join(' ')
        const { guild } = message
    
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName
        })
        if (!role) {
            embed.error('Invalid Arguments', `${roleName} is not valid`, message)
            return
        }

    
        const member = guild.members.cache.get(target.id)

        if(!member.roles.cache.get(role.id)) {
            embed.error('Incorrect Role', `${target} does not have the specified role`, message)
            return
        }

        member.roles.remove(role)
    
        embed.succes('Succesfully Removed The Role', `Successfully removed ${roleName} role from ${target}!`, message)
    }
    }