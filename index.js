require('module-alias/register')
const guild = require('@settings/guild')
const Discord = require("discord.js");
const { token, mongooseString, lavaPass } = require("./token.json")
const config = require("./config.json")
const { Manager } = require('erela.js')
const client = new Discord.Client({
  messageCacheMaxSize: 1000,
    messageCacheLifetime: 43200,
  messageSweepInterval: 3600,
  partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const mongoose = require('mongoose')
const Kitsu = require('kitsu.js')
client.kitsu = new Kitsu();

const clientID = "8df0a986d41e4b76a0d2f1cff77885a3"
const clientSecret = "d8c42c3261fe4315b6190a7cea2dd5f8"
let allPrefixs;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
let noRepeat = 0
client.on("ready", async () => {
  allPrefixs = await guild.getAllPrefixes()
if (noRepeat != 0) return
noRepeat++
  client.user.setActivity(`m.help | ${client.guilds.cache.size} servers!`, {
    type: "LISTENING",
  });
  console.log(`${client.user.username} is Online! ID: ${client.user.id}`);
  client.manager.init(client.user.id)
}); 

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.manager = new Manager({
  nodes: [{
    host: "localhost",
    port: 2333,
    password: lavaPass
  },
],
send(id, payload) {
  const guild = client.guilds.cache.get(id);
  if (guild) guild.shard.send(payload)
},
})
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player, track) => {
    client.channels.cache
      .get(player.textChannel)
      .send(`Now playing: ${track.title}`);
  })
  .on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send("Queue has ended.");

    player.destroy();
  });

client.on("message", async message => {
  let prefixObject;
  allPrefixs.forEach(obj => {
    if (obj.guildId == message.guild.id) prefixObject = obj
    })
    config.prefix = prefixObject?.prefix || config.prefix

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
  
   
   });
   client.on("raw", (d) => client.manager.updateVoiceState(d));

client.login(token);