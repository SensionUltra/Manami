const Discord = require("discord.js");
const { token, prefix, mongooseString } = require("./config.json")
const client = new Discord.Client();
const mongoose = require('mongoose')
const Kitsu = require('kitsu.js')
client.kitsu = new Kitsu();

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
    if(!message.content.startsWith(prefix)) return;
    
       if (!message.member) message.member = await message.guild.fetchMember(message);
  
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      
      if (cmd.length === 0) return;
      
      // Get the command
      let command = client.commands.get(cmd);
      // If none is found, try to find it by alias
      if (!command) command = client.commands.get(client.aliases.get(cmd));
  
      // If a command is finally found, run the command
      if (command) 
          command.run(client, message, args);
  
   
   })

client.login(token);
