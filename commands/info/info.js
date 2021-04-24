const { MessageEmbed } = require("discord.js");
const os = require("os");
const cpuStat = require("cpu-stat");
const moment = require("moment");
let path = os.platform() === "win32" ? "c:" : "/";
const fetch = require('node-fetch');


module.exports = {
  name: "info",
  aliases: ["about"],
  description: "Shows information about the Bot",
  cooldown: 3000,
  run: async (client, message, args) => {
    grammar = (amount, string, strings) => {
      let properString = amount == 1 ? string : strings;
      return properString;
    };


    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24; // 1 Day = 24 Hours
    const minutes = Math.floor(client.uptime / 60000) % 60; // 1 Hour = 60 Minutes
    const seconds = Math.floor(client.uptime / 1000) % 60;

    const osDays = Math.floor(os.uptime / 86400);
    const osHours = Math.floor(os.uptime / 3600) % 24; // 1 Day = 24 Hours
    const osMinutes = Math.floor(os.uptime / 60) % 60; // 1 Hour = 60 Minutes
    const osSeconds = Math.floor(os.uptime) % 60

    const status = {
      online: "<:onlinestat:806751831719804955>",
      idle: "<:idlestat:806751406613594112>",
      dnd: "<:dndstat:806752021780234271>",
      offline: "<:offlinestat:806752213397143562>",
    };
    
    if(!args[0]) {
      const embed = new MessageEmbed()
      .setTitle("Options")
      .setDescription("These are the options for the info command\n\n**Bot**\n**Specs**\n**Lavalink**")
      .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

      message.reply(embed)
      return;

    }
    switch (args[0]) {
      case "bot":
        message.channel.startTyping()
        const embed = new MessageEmbed()
        .setTitle("Bot Statistics")
        .addField("Name:", `${client.user.tag}`, true)
        .addField("ID:", `${client.user.id}`, true)
        .addField("Status", `${status[client.presence.status]}`, true)
        .addField("Uptime:", `\`${days}\` ${grammar(days, 'day', 'days')} \`${hours}\` ${grammar(hours, 'hour', 'hours')} \`${minutes}\` ${grammar(minutes, 'minute', 'minutes')} \`${seconds}\` ${grammar(seconds, 'second', 'seconds')}`, true)
        .addField("Servers:", `${client.guilds.cache.size}`, true)
        .addField("Users:", `${client.users.cache.size}`, true)
        .addField("Channels:", `${client.channels.cache.size.toLocaleString()}`, true)
        .addField("Commands", `${client.commands.size - 1}`, true)
        .addField("Creation", `${moment.utc(client.user.createdAt).format('LLLL')}`, true)
        .addField("Library", "[Discord.js](https://discord.js.org/#/)")


        fetch(`https://api.voidbots.net/bot/stats/817653964161548289`, {
    method: "POST",
    headers: { 
      Authorization: process.env.VOIDTOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"server_count": client.guilds.cache.size, "shard_count": 0 })
  }).then(response => response.text())
.then(console.log).catch(console.error);


        message.reply(embed)
        message.channel.stopTyping()
        break;
      case "specs":
        message.channel.startTyping()
        const embed2 = new MessageEmbed()
        .setTitle("Bot Statistics")
        .addField("CPU", `**${cpuStat.totalCores()}** - Cores\n**${os.cpus()[0].model}** - Model\n**${os.cpus()[0].speed}MHz** - Speed`, true)
        .addField("Memory", `**${formatBytes(os.totalmem)}** - Total \n**${formatBytes(os.freemem())}** - Free\n**${formatBytes(os.totalmem - os.freemem)}** - Used`,)
        .addField("Operating System", `**${os.type}/${os.platform}** - OS\n**${os.arch}** - Arch\n**${os.version}** - Version\n**${os.release}** - Model\n**${process.pid}** - Process ID\n**${osDays}** days **${osHours}** hrs **${osMinutes}** mins **${osSeconds}** secs - Uptime`)
        message.reply(embed2)
        message.channel.stopTyping()
        break;
    }

    function formatBytes(a, b) { 
      let c = 1024; // 1 GB = 1024 MB
      d = b || 2;
      e = ["B", "KB", "MB", "GB", "TB"];
      f = Math.floor(Math.log(a) / Math.log(c));

      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
    }
  },
};
