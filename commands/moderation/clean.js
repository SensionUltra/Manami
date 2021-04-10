const { MessageEmbed } = require('discord.js')
const embed = require('@auto/embeds')
module.exports = {
    name: "clean",
    aliases: ["cleanchannel"],
    description: "clean a given channel",
    usage: "clean <reason>",
    category: "utility",
    run: async(client, message, args) => {
        if(message.member.id !== message.guild.owner.id) {
             message.reply("You are aren't the server owner!")
             return
        }
        let reason = args.join(" ") || "No Reason Provided"
        if(message.channel.id == message.guild.rulesChannelID) {
            message.reply("This channel cannot be cleaned, because it is a rules channel")
            return
        }
        if(message.channel.id == message.guild.publicUpdatesChannelID) {
            message.reply("This channel cannot be cleaned, because it is a public updates channel")
            return
        }
        embed.error('Please State A Reason', 'You have 15 seconds, if no reason is provided then the reason will be \`No Reason Provided\`', message).then(() => {
            const reasonFilter = m => m.author.id == message.author.id;
            message.channel.awaitMessages(reasonFilter, { max: 1, time: 15000, errors: ['time'] })
            .then(collected => {
                reason = collected.first().content
                finish()
            })
            .catch(collected => {
                reason = 'No Reason Provided'
                finish()
            })
            finish = () => {
                embed.error('Are you sure you want to clean this channel?', 'Warning: this will clear all the messages from this channel and there is no going back.\nYou have 15 seconds to decide.', message).then(() => {     
                    const filter = m => m.author.id == message.author.id && (m.content == 'yes' || m.content == 'no');
                    
                    message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
                    
                    .then(async collected => {
                        if (collected.first().content == 'yes') {
                            
                            let newchannel = await message.channel.clone()
                            let oldChannel = await message.channel
                            await message.channel.delete()
                            let cleanEmbed = new MessageEmbed()
                            .setTitle(`BAM! \`${oldChannel.name}\` **has been successfully cleaned**`)
                            .setDescription(reason)
                            .setImage('https://cdn.discordapp.com/attachments/828468268317802578/828468620157386783/tenor.gif')
                            await newchannel.send(cleanEmbed)
                        } else {
                            embed.succes('Succesfully Cancled The Clean', 'Succesfully cancled the clean for this channel', message)
                        }
                    })
                    .catch(collected => {
                        embed.error('Timeout', 'You took to long to reply', message)
                    });
                })
            }

    })
    }
}