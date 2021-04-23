module.exports = {
name: "volume",
aliases: ["vol"],
description: "change the volume of the player",

run: (client, message, args) => {
    const userInput = args[0]
    const player = client.manager.players.get(message.guild.id);
    if (!message.member.voice.channel) return embed.error("`❌`Missing Requirments", "You must join a voice channel", message)
    const { channel } = message.member.voice;
    if(channel.id !== player.voiceChannel) {
        message.reply("`❌` You are not in the same voice channel")
        return;
    }
    if (!player) return message.inlineReply("`❌` There is no player in this guild", { allowedMentions: { repliedUser: false }});
    if(!userInput) return message.inlineReply("`❌` Enter a number")
    if(isNaN(userInput)) return message.inlineReply("`❌` That is not a number")

    player.setVolume(userInput)

    message.inlineReply(`\`✅\` Set volume to ${player.volume}`, { allowedMentions: { repliedUser: false }})

}}