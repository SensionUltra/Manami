module.exports = {
    name: "resume",
    aliases: ["kback"],
    description: "Pause the Song!",
    
    run: (client, message, args) => {
        const player = client.manager.players.get(message.guild.id);
            if (!player) return message.inlineReply("`❌` There is no player in this guild", { allowedMentions: { repliedUser: false }});
            const { channel } = message.member.voice;
            if (!message.member.voice.channel) return embed.error("`❌`Missing Requirments", "You must join a voice channel", message)
            if(channel.id !== player.voiceChannel) {
                message.reply("`❌` You are not in the same voice channel")
                return
            }
            if(player.paused == false) {
                message.inlineReply("`❌` Song is already resumed", { allowedMentions: { repliedUser: false }})
            } else {
                player.pause(false);
                message.inlineReply("`✅`Successfully resumed the song", { allowedMentions: { repliedUser: false }})
            }
    }}