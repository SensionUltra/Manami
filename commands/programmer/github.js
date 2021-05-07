const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "github",
  cooldown: 10000,
  aliases: ["githubuser", "gh"],
  description: "search up a github user!",
  run: async (client, message, args) => {
    const name = args.join(" ");
    if (!name) return message.channel.send("Please specify a github username"); // if no github username lul
    const url = `https://api.github.com/users/${name}`; // Uh the api

    let response;
    try {
      response = await fetch(url).then((res) => res.json());
    } catch (e) {
      return message.reply("Error", e);
    }

    const embed = new MessageEmbed()
      .setTitle(response.login)
      .setURL(response.html_url)
      .setThumbnail(response.avatar_url)
      .addField("❯ Followers", response.followers, true)
      .addField("❯ Following", response.following, true)
      .addField("❯ Public Repositories", response.public_repos ? response.public_repos : 'None', true)
      .addField("❯ Public Gists", response.public_gists ? response.public_gists : 'None', true)
      .addField('❯ Bio', response.bio ? response.bio : 'No Bio', true)
      .addField("❯ Email", response.email ? response.email : 'No Email', true)
      .addField("❯ Location", response.location ? response.location : 'No Location', true)

    message.channel.send(embed);
  },
};

