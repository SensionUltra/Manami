const Discord = require("discord.js");
const fetch = require("node-fetch");
const config = require("../../config.json");

module.exports = {
  name: "contributors",
  description: "List the contributors for Manami",
  run: async (client, message, args) => {
    const contributors = await (
      await fetch("https://api.github.com/repos/SensionUltra/Manami/contributors")
    ).json();

    contributors = contributors.map(
      (contributor) =>
        new Object({
          name: contributor.login,
          value: `[Click me to visit their GitHub](${contributor.html_url})`,
          inline: true,
        })
    );

    const embed = new Discord.MessageEmbed()
      .setTitle("All the contributors that are helping make Manami awesome!")
      .setDescription(
        "Be sure to drop a star on the repo, [here!](https://github.com/SensionUltra/Manami)"
      )
      .addFields(contributors)
      .setColor("BLUE")
      .setFooter(`Manami - This command was made by molai.dev#9999!`);

    message.inlineReply(embed);
  },
};
