const { MessageEmbed } = require("discord.js");

module.exports = {
name: "search",
aliases: ["lookup"],
description: "search a song",

run: async(client, message, args) => {
    const text = args.join(' ')
    try {
        if (!message.member.voice.channel) return embed.error("`❌`Missing Requirments", "You must join a voice channel", message)
        const results = await client.manager.search(text, message.author)
        const tracks = results.tracks.slice(0, 10);
        let des_res = "";
        let counter = 1
        for (const track of tracks) {
            des_res += `**${counter} ** [${track.title}](${track.uri})\n`;
            counter++
        }
        const searchEmbed = new MessageEmbed()
        .setTitle("`🔎` Search Results!")
        .setDescription(des_res)
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(searchEmbed)
        const searchMessage = await message.inlineReply("`🕒`Please the number of the song you want to play, you have **1** minute", { allowedMentions: { repliedUser: false }})
        const userInput = await message.channel.awaitMessages((msg) => msg.author.id === message.author.id, {
            max: 1,
            time: 1000 * 60,
        });
        if(!userInput.first()) {
            const noTime = new MessageEmbed()
            .setDescription("`⏳`Time Ran Out")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM");
            return searchMessage.edit(noTime, { allowedMentions: { repliedUser: false }})
        }
        const ans = userInput.first().content;
        if (isNaN(ans) || ans > 10) {
            await searchMessage.delete();
            return message.channel.send("`❌` You need to provide a number lower than 10 and a valid number")
        }
        const chosenTrack = tracks[ans - 1]
        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
          });

          if (!message.guild.me.voice.channel) {
            player.connect();
             }

             player.queue.add(chosenTrack);
             const addedEmbed = new MessageEmbed()
    .setDescription(`\`🎶\` Added Track To The Queue: **[${chosenTrack.title}](${chosenTrack.uri})**`)
    .setColor("RANDOM")

    message.channel.send(addedEmbed)
             if (!player.playing && !player.paused && !player.queue.size){
                player.play();
                searchMessage.delete();
             }
    }  catch (err) {
        return message.channel.send(`${err.message}`)
    }
}}

function format(millis) {
    try {
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    } catch (e) {
      console.log(String(e.stack))
    }
  }