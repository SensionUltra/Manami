const embed = require('@auto/embeds')
module.exports = {
name: "clearq",
aliases: ["clearqueue"],
description: "clear the whole queue",

run: (client, message, args) => {
    const player = message.client.manager.get(message.guild.id);
    const { channel } = message.member.voice;
    if (!player) return message.inlineReply("`❌` There is no player in this guild", { allowedMentions: { repliedUser: false }});
    if (!message.member.voice.channel) return embed.error("`❌`Missing Requirments", "You must join a voice channel", message)
    if(channel.id !== player.voiceChannel) {
        message.reply("`❌` You are not in the same voice channel")
        return
    }

    player.queue.clear()

    message.inlineReply(`\`✅\` Cleared ${player.queue.size} Tracks!`)


}}