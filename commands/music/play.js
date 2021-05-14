const { MessageEmbed } = require("discord.js");
const embed = require('@auto/embeds')
module.exports = {
  name: "play",
  aliases: ["p"],
  description: "Play Music!",
  run: async (client, message, args) => {
    const text = args.slice(0).join(' ')
    if (!message.member.voice.channel) return embed.error("`❌`Missing Requirments", "You must join a voice channel", message)
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
    message.channel.send(new MessageEmbed()
    .setColor("BLUE")
    .setTitle("`🔍` Searching!")
    .setDescription(`\`\`\`${text}\`\`\``)
  ).then(msg=>{
    msg.delete({timeout: 5000}).catch(e=>console.log("Could not delete, this prevents a bug"))
  })
    if(!res.tracks[0]) {
      const noResEmbed = new MessageEmbed()
      .setTitle("`❌` No Results Found")
      .setFooter("Please retry!")
      .setTimestamp()
      message.channel.send(noResEmbed)
      return;
    }
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