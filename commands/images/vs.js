const Discord = require('discord.js');
const config = require('../../token.json');
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(config.AME_API);

module.exports = {
        name: 'vs',
        description: 'Editing image and send vs one!',
        aliases: ["against"],
    run: async (client, message, args) => {

        if (args.length > 2) {
            message.channel.send('To many Arguments | Max: 2')
            return
        } 
        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let user2 = await message.mentions.members.last()
        let m = await message.channel.send("**Please Wait...**");
        let buffer = await AmeAPI.generate("vs", { url: user.user.displayAvatarURL({ format: "png", size: 2048 }), avatar: user2.user.displayAvatarURL({ format: "png", size: 2048 })  });
        let attachment = new Discord.MessageAttachment(buffer, "vs.png");
        m.delete({ timeout: 1000 });
        message.channel.send(attachment);

    }
}