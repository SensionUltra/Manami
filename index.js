require('module-alias/register')
require('dotenv').config()
const guildDoc = require('@settings/guild')
const clientDoc = require('@client/client')
const Discord = require("discord.js");
const config = require("./config.json")
const ms = require('ms')
const colors = require("colors");
const client = new Discord.Client({
  messageCacheMaxSize: 1000,
    messageCacheLifetime: 43200,
  messageSweepInterval: 3600,
  partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const Kitsu = require('kitsu.js')
client.kitsu = new Kitsu();


let allPrefixs;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();
const Cooldown = new Discord.Collection();

["command", "events"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

cachePrefixes = async (guildId) => {
  if (guildId) {
    const prefix = await guildDoc.getPrefix(guildId)
    const guild = client.guilds.cache.get(guildId)
    if (prefix) {
      guild.prefix = prefix
    } else {
      guild.prefix = config.prefix
    }
  } else {
    allPrefixs = await guildDoc.getAllPrefixes()
    client.guilds.cache.forEach(guild => {
      allPrefixs.forEach(obj => {
        if (obj.guildId == guild.id) {
          guild.prefix = obj.prefix
        }
      })
      if (!guild.prefix) guild.prefix = config.prefix
    })
  }
}

client.on('guildCreate', (guild) => {
  cachePrefixes(guild.id)
})

  client.on('guildMemberAdd', async (member) => {
    const welcome = await guildDoc.getWelcome(member.guild.id)
    if (!welcome.message) return;
    const message = welcome.message.replace(`<@>`, `<@${member.id}>`)
    const channel = member.guild.channels.cache.get(welcome.channelId)
    channel.send(message)
})

client.on('guildMemberRemove', async (member) => {
  const leave = await guildDoc.getLeave(member.guild.id)
  if (!leave.message) return;
  const message = leave.message.replace(`<@>`, `<@${member.id}>`)
  const channel = member.guild.channels.cache.get(leave.channelId)
  channel.send(message)
})

client.on("message", async message => {
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
   });

client.login(process.env.BOTTOKEN);
