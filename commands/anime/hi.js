const Discord = require('discord.js');

module.exports = {
      name: "hi",
      aliases: ["Hi"],
      description: "say hi to a user!",
      cooldown: 3000,
  run: async (client, message, args) => {
    const snpm = require('sakuranpm');

    let imgKiss = await snpm.hi();

    let slaps = [imgKiss];
    let slapR = slaps[Math.floor(Math.random() * slaps.length)];
    let personslap = message.mentions.members.first();
    let quote = ['OwO', ' Hello!', "Haiii!"];
    let quoter = quote[Math.floor(Math.random() * quote.length)];

    if (!personslap) {
        let personslap = 'nobody';

        let embed = new Discord.MessageEmbed()
            .setDescription(`**<@${message.author.id}> said hello to ${personslap}! ${quoter}!**`)
            .setImage(slapR)
            .setColor("BLUE");

        message.channel.send(embed);
        return;
    }

    if (personslap.id === message.author.id) {
        let personslap = 'them own damnselves!';
        let embed = new Discord.MessageEmbed()
            .setDescription(`**<@${message.author.id}> said hello to ${personslap}! I think they are on serious need of affection!**`)
            .setImage(slapR)
            .setColor("BLUE");

        message.channel.send(embed);
        return;
    }

    if (personslap.id === client.user.id) {
        let personslap = 'me? B-baka!';
        let embed = new Discord.MessageEmbed()
            .setDescription(`**<@${message.author.id}> said hello to ${personslap}!**`)
            .setImage(slapR)
            .setColor("BLUE");

        message.channel.send(embed);
        return;
    }

    let embed = new Discord.MessageEmbed()
        .setDescription(`**<@${message.author.id}> said hello to ${personslap}! ${quoter}!**`)
        .setImage(slapR)
        .setColor("BLUE");

    message.channel.send(embed);
}
}