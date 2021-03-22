const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({ disableMentions: "all" });

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

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(config.prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(config.prefix.length).trim().split(/ + /g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.login(config.token);
