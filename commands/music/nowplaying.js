const { MessageEmbed } = require("discord.js");
const { porgressBar } = require("music-progress-bar");

module.exports = {
    name: "nowplaying",
    aliases: ['cursong', 'np'],
    description: "See the current song playing",
    run: (client, message, args) => {
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.inlineReply("`❌` There is no player in this guild", { allowedMentions: { repliedUser: false }});

        const { title, duration } = player.queue.current;
        let progressBar = porgressBar({ currentPositon: player.position > 0 ? player.position : "1", endPositon: duration, width: 15, barStyle: "▬", currentStyle: player.playing ? "🔷" : "🔺"  }, { format:` ${player.playing ? "`⏯`" : "`⏸`"} <bar> ` });
        const embed = new MessageEmbed()
        .setTitle("Now Playing")
        
        .setDescription(`**${player.playing ? "" : ""} ${title}**\n${progressBar} \`${player.position <= 60000 ? `${format(player.position)}` : format(player.position)} / ${format(duration)}\``)

        message.channel.send(embed)

    }
}

function format(millis) {
    try {
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s
    } catch (e) {
      console.log(String(e.stack))
    }
  }