const clientDoc = require('@client/client')
module.exports = {
name: "restart",
owner: true,
description: "restart the bot",
run: async(client, message, args) => {
    const msg = await message.channel.send("Restarting Bot...")
    clientDoc.setRestartMessage(msg.id, message.channel.id, client).then(() => {
        console.log('now restarting')
        process.exit()
    })
}
}