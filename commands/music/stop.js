const embed = require('@auto/embeds')

module.exports = {
    name: "stop",
    aliases: ['shutup'],
    description: "Stop the player",
    run: (client, message, args) => {
        const player = client.manager.players.get(message.guild.id);
        if (!player) return message.inlineReply("`❌` There is no player in this guild", { allowedMentions: { repliedUser: false }});
        const { channel } = message.member.voice;
        if (!message.member.voice.channel) return embed.error("`❌`Missing Requirments", "You must join a voice channel", message)
        if(channel.id !== player.voiceChannel) {
            message.reply("`❌` You are not in the same voice channel")
            return
        }
        if(player) {
            player.destroy();
            message.inlineReply("`✅`Successfully stopped the player", { allowedMentions: { repliedUser: false }})
        }
    }
}