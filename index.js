require("module-alias/register");
require('@auto/inlineReply')
const AutoPoster = require('topgg-autoposter')
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
const ap = AutoPoster(process.env.TOPGGTOKEN, client)
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();

fs.readdirSync("./handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

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
      host: "manamibot.xyz",
      port: 2293,
      password: process.env.LAVAPASS,
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
  .on("queueEnd", (player) => {
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



function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}