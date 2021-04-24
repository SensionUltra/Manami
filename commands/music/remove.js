module.exports = {
name: "remove",
aliases: ["removequeue"],
description: "Remove a song in queue",

run: (client, message, args) => {
    const userInput = args[0]
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.inlineReply("`❌` There is no player in this guild", { allowedMentions: { repliedUser: false }});
    if(!userInput) return message.inlineReply("`❌` Enter a number")
    if(isNaN(userInput)) return message.inlineReply("`❌` That is not a number")

    player.queue.remove(userInput - 1)
    
    message.inlineReply(`\`✅\` Removed The Track!`, { allowedMentions: { repliedUser: false }})



}
}