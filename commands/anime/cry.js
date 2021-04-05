const Discord = require('discord.js');

module.exports = {
      name: "cry",
      aliases: ["cri"],
      description: "cri",
      cooldown: 3000,
  run: async (client, message, args) => {
    const snpm = require('sakuranpm');

    let imgKiss = await snpm.cry();

    let slaps = [imgKiss];
    let slapR = slaps[Math.floor(Math.random() * slaps.length)];
    let quote = ['Happy now?', 'UwU', "I will always be here to pat you!"];
    let quoter = quote[Math.floor(Math.random() * quote.length)];

    if (message.author.id) {
        let embed = new Discord.MessageEmbed()
            .setDescription(`**Oh no, <@${message.author.id}> just started crying**`)
            .setImage(slapR)
            .setColor("BLUE");

        message.channel.send(embed);
        return;
    }
}
}