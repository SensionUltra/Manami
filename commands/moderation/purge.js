module.exports = {
    name: "purge",
    aliases: ["delete", "clear"],
    description: "deletes number of messages",
    usage: "<number>",
    run: (client, message, args) => {
        const amount = parseInt(args[0]) + 1;
                                    
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send ('You can\'t run this command')

        if (isNaN(amount)) {
        return message.channel.send('Please provide an amount of messages to delete');
        } else if (amount > 100 || amount < 1 ) { 
        return message.channel.send('Please provide a number less than 100 or bigger then 0')
        }


        message.channel.bulkDelete(amount, true)
        .then( messages => message.channel.send(`Deleted \`${messages.size - 1}/${amount - 1}\` messages!`).then ( msg => msg.delete({ timeout: 10000 })))
        .catch ( error => message.channel.send(`Oh no an error has occurred \n \`${error.message}\``))
    }
}