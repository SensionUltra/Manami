const Discord = require("discord.js");

module.exports = {
  name: "snipe",
  aliases: [""],
  description: "snipe someones deleted message",

  run: (client, message, args) => {
    const snipes = client.snipes.get(message.channel.id) || [];
    const msg = snipes[args[0] - 1 || 0];
    if (!msg) return message.channel.send(`Invalid Snipe`);
    const Embed = new Discord.MessageEmbed()
      .setAuthor(
        msg.author.tag,
        msg.author.displayAvatarURL({ dynamic: true, size: 256 })
      )
      .setDescription(msg.content)
      .setFooter(`${args[0] || 1}/${snipes.length}`);
      Embed.setTimestamp()
    if (msg.attachment) Embed.setImage(msg.attachment);
    message.channel.send(Embed);
  },
};
