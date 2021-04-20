const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "rps",
  aliases: ["rockpaperscissors"],
  description: "play rps with the bot!",
  run: async (client, message, args) => {
    const rpsEmbed = new MessageEmbed()
      .setTitle("Rock, Paper, Scissors!")
      .setDescription("Choose a reaction to play!")
      .setFooter(
        `Requested By ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    const msg = await message.channel.send(rpsEmbed);
    await msg.react("🗻");
    await msg.react("📄");
    await msg.react("✂");

    const filter = (reaction, user) => {
      return (
        ["🗻", "📄", "✂"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };

    const choices = ["🗻", "📄", "✂"];
    const me = choices[Math.floor(Math.random() * choices.length)];
    msg
      .awaitReactions(filter, { max: 1, time: 60000, error: ["time"] })
      .then(async (collected) => {
        const reaction = collected.first();
        let result = new MessageEmbed()
          .setTitle("Results!")
          .setDescription(`${reaction.emoji.name} **vs** ${me}`)
          .setTimestamp();
        await msg.edit(result);

        if (
          (me === "🗻" && reaction.emoji.name === "✂") ||
          (me === "✂" && reaction.emoji.name === "📄") ||
          (me === "📄" && reaction.emoji.name === "🗻")
        ) {
          message.reply("You Lost! 😂");
        } else if (me === reaction.emoji.name) {
          return message.reply("It's a tie!");
        } else {
          return message.reply("You won!");
        }
      })
      .catch((collected) => {
        message.reply("You ran out of time!, game ended 😢");
      });
  },
};
