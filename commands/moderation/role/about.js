const embed = require('@auto/embeds')
const fs = require('fs')
module.exports = {
name: "role",
description: "adds/removes a role to a user.",
subcommand: true,
run: (client, message, args) => {
    const optionsList = [];
    fs.readdirSync(`${__dirname}`).filter(file => file.endsWith('.js') && file.startsWith('about.js') != true).forEach(file => {
        let cmd = require(`./${file}`)
        optionsList.push(
            {name: `${cmd.name}`, value: `${cmd.description}`}
        )
    })
    embed.fieldListEmbed('Add Or Remove Roles:', optionsList, message)
}
}