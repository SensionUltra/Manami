const embed = require('@auto/embeds')
const fs = require('fs')
module.exports = {
name: "modify",
description: "modifys text",
subcommand: true,
run: (client, message, args) => {
    const optionsList = [];
    fs.readdirSync(`${__dirname}`).filter(file => file.endsWith('.js') && file.startsWith('about.js') != true).forEach(file => {
        let cmd = require(`./${file}`)
        optionsList.push(
            {name: `${cmd.name}`, value: `${cmd.description}`}
        )
    })
    embed.fieldListEmbed('Options To Modify Text', optionsList, message)
}
}