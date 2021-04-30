module.exports = {
    name: "purge",
    aliases: ["delete", "clear"],
    description: "deletes number of messages",
    usage: "<number>",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply("`❌` You can't use this command!")
        const amountPurge = parseInt(args[0], 10);
        const purgedMessage = `\`✅\` Succesfully deleted **${amountPurge}** messages`

        if(!amountPurge || amountPurge > 100 || amountPurge < 2) return message.inlineReply("`❌` | Please enter a number between 2 - 100")

        const fetchMessages = await message.channel.messages.fetch({
            limit: amountPurge
        });

        message.channel.bulkDelete(fetchMessages)
        .catch(err => message.channel.send("`❌` An error has occured, please report this", err))
        .then(() => message.channel.send(purgedMessage))
        .catch(err => {
            console.log(err);
        });
    }
}