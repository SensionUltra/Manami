const { MessageEmbed } = require('discord.js')

module.exports = (client) => {}

module.exports.error = (title, errMessage, message) => {
    const errorEmbed = new MessageEmbed()
    .setTitle(title)
    .setDescription(errMessage)
    .setColor('#ff0000')
    return message.channel.send(errorEmbed)
}

module.exports.success = (title, succesMessage, message) => {
    const succesEmbed = new MessageEmbed()
    .setTitle(title)
    .setDescription(succesMessage)
    .setColor('#00ff00')
    return message.channel.send(succesEmbed)
}

module.exports.fieldListEmbed = (title, fields, message) => {
    const fieldListEmbed = new MessageEmbed()
    .setTitle(title)
    .addFields(fields)
    .setColor('#00ff00')
    return message.channel.send(fieldListEmbed)
}