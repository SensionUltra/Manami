const Discord = require("discord.js");
const { token, mongooseString } = require("./token.json")
const config = require("./config.json")
const client = new Discord.Client({
  messageCacheMaxSize: 1000,
    messageCacheLifetime: 43200,
  messageSweepInterval: 3600,
  partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const mongoose = require('mongoose')
const Kitsu = require('kitsu.js')
client.kitsu = new Kitsu();
const levels = require('./levels')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.on("ready", () => {
  client.user.setActivity(`m.help | ${client.guilds.cache.size} servers!`, {
    type: "LISTENING",
  });
  console.log(`${client.user.username} is Online! ID: ${client.user.id}`);
}); 

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
  
  if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(config.prefix)) return;
    
       if (!message.member) message.member = await message.guild.fetchMember(message);
  
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      
      if (cmd.length === 0) return;
      
      // Get the command
      let command = client.commands.get(cmd);
      // If none is found, try to find it by alias
      if (!command) command = client.commands.get(client.aliases.get(cmd));
      if (command?.owner && config.ownerIds.includes(message.author.id) == false) {
        if (typeof(command.owner) == "string") {
          return message.channel.send(command.owner)
        } else return
      }
      // If a command is finally found, run the command
      if (command) 
          command.run(client, message, args);
  
   
   })
   levels(client)

client.login(token);
