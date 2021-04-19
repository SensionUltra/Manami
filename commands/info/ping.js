module.exports = {
    name: "ping",
    description: "see the ping!",
    cooldown: 3000,
    run: async (client, message, args) => {
        const msg = await message.reply('Pinging...')

        const latency = msg.createdTimestamp - message.createdTimestamp

        msg.edit(`:ping_pong: Latency: \`${latency}ms\` WS: \`${client.ws.ping}ms\``)
    }
}