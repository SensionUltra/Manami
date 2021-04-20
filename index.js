require('module-alias/register')
require('dotenv').config()
const fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client({
  messageCacheMaxSize: 1000,
    messageCacheLifetime: 43200,
  messageSweepInterval: 3600,
  partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const Kitsu = require('kitsu.js')
client.kitsu = new Kitsu();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = new Discord.Collection();


fs.readdirSync('./handlers').forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

if (process.env.USER != 'root') {
  client.login(process.env.DEVBOTTOKEN)
} else {
  client.login(process.env.BOTTOKEN);
}
