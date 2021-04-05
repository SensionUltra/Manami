require('module-alias/register')
const guild = require('@settings/guild')
const Discord = require("discord.js");
const { token, mongooseString, lavaPass } = require("./token.json")
const config = require("./config.json")
const ms = require('ms')
const { Manager } = require('erela.js')
const client = new Discord.Client({
  messageCacheMaxSize: 1000,
    messageCacheLifetime: 43200,
  messageSweepInterval: 3600,
  partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const mongoose = require('mongoose')
const Kitsu = require('kitsu.js')
client.kitsu = new Kitsu();

let allPrefixs;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const Cooldown = new Discord.Collection();
let noRepeat = 0
client.on("ready", async () => {
  allPrefixs = await guild.getAllPrefixes()
        if (noRepeat != 0) return
        noRepeat++
        client.supportServer = client.guilds.cache.get('826614093695811594')
        client.supportServer.reportChannel = client.channels.cache.get('827075339980111925')
  client.user.setActivity(`m.help | ${client.guilds.cache.size} servers!`, {
    type: "LISTENING",// sets the activity
  });
// logs info about the currently logged in client
  console.log(`${client.user.username} is Online! ID: ${client.user.id}`);
  client.manager.init(client.user.id)
}); 

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.manager = new Manager({
  nodes: [{
    host: "localhost",
    port: 1245,
    password: 'youshallnotpass'
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

  client.on('guildMemberAdd', async (member) => {
    const welcome = await guild.getWelcome(member.guild.id)
    const message = welcome.message.replace(`<@>`, `<@${member.id}>`)
    const channel = member.guild.channels.cache.get(welcome.channelId)
    channel.send(message)
})

client.on("message", async message => {
  let prefixObject;
  allPrefixs.forEach(obj => {
    if (obj.guildId == message?.guild?.id) prefixObject = obj
    })
    config.prefix = prefixObject?.prefix || config.prefix

    message.guild.prefix = config.prefix

  if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(config.prefix)) return;
    
       if (!message.member) message.member = await message.guild.fetchMember(message);
  
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
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
        }
    }
   });
   client.on("raw", (d) => client.manager.updateVoiceState(d));

client.login(token);