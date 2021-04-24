module.exports = {
name: "pause",
aliases: ["waitamin"],
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
        if(player.paused) {

            message.inlineReply("`❌` Song is already paused", { allowedMentions: { repliedUser: false }})
        } else {
            player.pause(true);
            message.inlineReply("`✅`Successfully paused the song", { allowedMentions: { repliedUser: false }})
        }
}}