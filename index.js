require("module-alias/register");
const EventEmitter = require('events').EventEmitter
require('@auto/inlineReply')
const AutoPoster = require('topgg-autoposter')
const { format, sleep } = require('./modules/functions/functions')
require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client({
  messageCacheMaxSize: 1000,
  messageCacheLifetime: 43200,
  messageSweepInterval: 3600,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const Kitsu = require("kitsu.js");
client.kitsu = new Kitsu();
const { Manager } = require("erela.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();
client.events = {}
client.events.commands = new EventEmitter()

fs.readdirSync("./handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
require('./modlogs/event')(client)

const ap = AutoPoster(process.env.TOPGGTOKEN, client)

if (process.env.USER != "root") {
  console.log("Didn't upload stats to Top.gg because this is not Manami")
} else {
ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})
}
client.manager = new Manager({
  nodes: [
    {
      id: "1",
      host: process.env.HOST,
      port: 3439,
      password: 'AwokensLavalinkServer'
    },
  ],

  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})
  .on("nodeConnect", (node) =>
    console.log(`Node ${node.options.identifier} successfully connected`)
  )
  .on("nodeError", (node, error) =>
    console.log(
      `Node ${node.options.identifier} had an error: ${error.message}`
    )
  )
  .on("trackStart", (player, track) => {
    const nowPlayEmbed = new Discord.MessageEmbed()
      .setTitle("`🎶` Playing New Song!") 
    .setDescription(`Added - **[${track.title}](${track.uri})**`)
    .addField("`⌛` Duration", `${format(track.duration)}`, true)
    .addField("`📖` Author", `${track.author}`, true)
    .addField("`🔰` Queue Length", `${player.queue.size}`, true)

    client.channels.cache.get(player.textChannel).send(nowPlayEmbed);
  })
  .on("queueEnd", async(player) => {
    await sleep(60000);
    const queueEndEmbed = new Discord.MessageEmbed()
      .setTitle("`❌` Queue has ended")
      .setColor("RANDOM");
    client.channels.cache.get(player.textChannel).send(queueEndEmbed);
  
    

    player.destroy();
  });

if (process.env.USER != "root") {
  client.login(process.env.DEVBOTTOKEN);
} else {
  client.login(process.env.BOTTOKEN);
}

client.on("raw", (d) => client.manager.updateVoiceState(d));


