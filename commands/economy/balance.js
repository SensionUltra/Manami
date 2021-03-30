module.exports = {
name: "balance",
aliases: ["bal", "howmuchmoneyigot"],
description: "See how much coins you have",
run: (client, message, args) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    console.log(`ID: ${targetId}`)
}
}