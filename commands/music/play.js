const { MessageEmbed } = require("discord.js");
const embed = require('@auto/embeds')
module.exports = {
  name: "play",
  aliases: ["p"],
  description: "Play Music!",
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return embed.error("`❌`Missing Requirments", "You must join a voice channel", message)
    const { channel } = message.member.voice;
    const res = await client.manager.search(
      message.content.slice(6),
      message.author
    );

    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });
    if(!message.content.slice(6)) return embed.error('\`❌\`Missing Arguments', 'Please provide a song name to search', message)
    if (!message.guild.me.voice.channel) {
      player.connect();
        }

    player.queue.add(res.tracks[0]);
    const addedEmbed = new MessageEmbed()
    .setDescription(`\`🎶\` Added Track To The Queue: **[${res.tracks[0].title}](${res.tracks[0].uri})**`)
    .setColor("RANDOM")

    message.channel.send(addedEmbed)

    if (!player.playing && !player.paused && !player.queue.size)
      player.play();

      if (
        !player.playing &&
        !player.paused &&
        player.queue.totalSize === res.tracks.length
      )
        player.play();
  },
};

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
