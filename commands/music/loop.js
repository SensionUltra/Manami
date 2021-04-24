module.exports = {
name: "loop",
aliases: ["againforever"],
description: "Loop the current song!",

run: (client, message, args) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.inlineReply("`❌` There is no player in this guild", { allowedMentions: { repliedUser: false }});
    const { channel } = message.member.voice;
    if (!message.member.voice.channel) return embed.error("`❌`Missing Requirments", "You must join a voice channel", message)
    if(channel.id !== player.voiceChannel) {
        message.reply("`❌` You are not in the same voice channel")
        return
    }
    if (player) {
        if (player.trackRepeat){
            player.setTrackRepeat(false);
            message.channel.send("`✅` Stopped looping the song!");
    }
        else {
            player.setTrackRepeat(true)
            message.channel.send("`✅` Started looping the song!");
        }
    }
}}