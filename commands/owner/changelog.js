const { succes } = require('@auto/embeds')
const { MessageEmbed } = require('discord.js')
const fs = require('fs')
module.exports = {
name: "changelog",
description: "new changelog",
aliases: ['cl'],
owner: true,
run: (client, message, args) => {
const changeChannel = client.channels.cache.get('827074815490916383')
const version  = args.shift()
const changes  = args.join(' ').split(' -- ')
const fields = [];
let errors = 0
let newcmds = 0

changes.forEach(change => {
const splitChange = change.split(' | ')
const fieldName = splitChange.shift()
if (fieldName.toLowerCase().includes('fix') && fieldName.toLowerCase().includes('error') || fieldName.toLowerCase().includes('bug') || fieldName.toLowerCase().includes('issue')) errors++
if (fieldName.toLowerCase().includes('new') && fieldName.toLowerCase().includes('cmd') || fieldName.toLowerCase().includes('command')) newcmds++
const fieldDescription = splitChange
    fields.push(
        {name: fieldName, value: fieldDescription}
    )
})
const changeEmbed = new MessageEmbed()
.setTitle(`Manami v${version}`)
.setDescription(`Its Here! Manami v${version}, with ${errors} fixed errors and ${newcmds} new cmds`)
.addFields(fields)

changeChannel.send(changeEmbed)
changeChannel.send('<@&829417625708003338>').then(msg => {
    msg.delete()
})
succes('Succesfully Sent That Change-Log', `Succesfully sent the change-log for Manami v${version}`, message)
}
}