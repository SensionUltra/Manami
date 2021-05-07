const { MessageEmbed } = require("discord.js");
const { plugin } = require("mongoose");
const fetch = require("node-fetch");

module.exports = {
name: "githubrepo",
usage: "<repoName>",
aliases: ["repo"],
description: "search up a github repo",
run: async(client, message, args) => {
    const name = args.slice(0).join('');
    if (!name) return message.channel.send("Please specify a github username"); // if no github username lul
    const url = `https://api.github.com/search/repositories?q=${name}`; // Uh the api

    let response;
    try {
      response = await fetch(url).then((res) => res.json());
    } catch (e) {
      return message.reply("Error", e);
    }

    const pkg = response.items[0]
    const embed = new MessageEmbed()
    .setTitle(pkg.name)
    .setURL(pkg.html_url)
    .setDescription(pkg.description)
    .addField("❯ License", pkg.license ? pkg.license : 'No License', true)
    .addField("❯ Stars", pkg.stargazers_count ? pkg.stargazers_count : 'None', true)
    .addField("❯ Watchers", pkg.watchers_count ? pkg.watchers_count : 'None', true)
    .addField("❯ Forks", pkg.forks ? pkg.forks : 'None', true)
    .addField("❯ Language", pkg.language, true)
    .addField("❯ Size", `${formatBytes(pkg.size)}`, true)

    message.channel.send(embed)

}
}

function formatBytes(a, b) { 
  let c = 1024; // 1 GB = 1024 MB
  d = b || 2;
  e = ["B", "KB", "MB", "GB", "TB"];
  f = Math.floor(Math.log(a) / Math.log(c));

  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + "" + e[f];
}

