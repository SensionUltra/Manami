const { MessageEmbed } = require('discord.js')

module.exports.error = (title, errMessage, message, color) => {
    if (!color) {
        color = '#ff0000'
    }
    const errorEmbed = new MessageEmbed()
    .setTitle(title)
    .setDescription(errMessage)
    .setColor(color)
    .setTimestamp()
    
    return message.channel.send(errorEmbed)
}

module.exports.succes = (title, succesMessage, message, color) => {
    if (!color) {
        color = '#00ff00' 
    }
    const succesEmbed = new MessageEmbed()
    .setTitle(title)
    .setDescription(succesMessage)
    .setColor(color)
    .setTimestamp()

    return message.channel.send(succesEmbed)
}

module.exports.fieldListEmbed = (title, fields, message, color) => {
    if (!color) {
        color = '#00ff00'
    }
    const fieldListEmbed = new MessageEmbed()
    .setTitle(title)
    .addFields(fields)
    .setColor(color)
    .setTimestamp()

    return message.channel.send(fieldListEmbed)
}
