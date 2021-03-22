module.exports = {
    name: "ping",
    description: "see the ping!",
    run: async (client, message, args) => {
        const msg = await message.channel.send('Pinging...')

        const latency = msg.createdTimestamp - message.createdTimestamp

        msg.edit(`:ping_pong: Latency: \`${latency}ms\` WS: \`${client.ws.ping}ms\``)
    }
}