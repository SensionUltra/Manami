const config = require("@root/config.json")
const ms = require('ms')
const Discord = require('discord.js')
const Cooldown = new Discord.Collection();
module.exports = {
    name: 'message',
    run: async(message, client) => {
        if(message.author.bot) return;
        if(!message.guild) return;
        if(!message.content.startsWith(message.guild.prefix)) return;
        
           if (!message.member) message.member = await message.guild.fetchMember(message);
          
          const args = message.content.slice(message.guild.prefix.length).trim().split(/ +/g);
          const cmd = args.shift().toLowerCase();
          if (cmd.length === 0) return;
          
          // Get the command
          let command = client.commands.get(cmd) // gets the cmd
          // If none is found, try to find it by alias
          if (!command) command = client.commands.get(client.aliases.get(cmd))
          if (command?.subcommand && args != 0) command = client.commands.get(cmd + ' ' + args.splice(0, 1)) // if the cmd is the about.js cmd for a sub cmd and if there are args then it will execute the sub-cmd instead
          if (command?.owner && config.ownerIds.includes(message.author.id) == false) {
            if (typeof(command.owner) == "string") {
              return message.channel.send(command.owner)
            } else return
          }
          // If a command is finally found, run the command
          if (command) {
            if(command.cooldown) {
                if(Cooldown.has(`${command.name}${message.author.id}`) && config.ownerIds.includes(message.author.id) == false) return message.channel.send(`Woah, way to quick there, you're on a \`${ms(Cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
                command.run(client, message, args)
                Cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                  Cooldown.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else {
              command.run(client, message, args)
            }
        }
    }
}