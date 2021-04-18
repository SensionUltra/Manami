const embed = require('@auto/embeds')
const { MessageEmbed } = require('discord.js')
module.exports = {
name: "changelog",
description: "new changelog",
aliases: ['cl'],
owner: true,
run: async(client, message, args) => {
    grammar = (amount, string, strings) => {
        let properString = amount == 1 ? string : strings;
        return properString;
      };

const changeChannel = client.channels.cache.get('827074815490916383')
const version  = args.shift()
const changes  = args.join(' ').split(' -- ')
const fields = [];
let errors = 0
let newCmds = 0
let updatedCmds = 0

checkName = (string) => {
    if (string.includes('fixed') && (string.includes('error') || string.includes('bug'))) errors++
if (string.includes('new command')) newCmds++
if (string.includes('updated command')) updatedCmds++
}
changes.forEach(change => {
const splitChange = change.split(' | ')
const fieldName = splitChange.shift()
checkName(fieldName.toLowerCase())
const fieldDescription = splitChange
    fields.push(
        {name: fieldName, value: fieldDescription}
    )
})
let info = [];
if (errors) info.push(`${errors} fixed ${grammar(errors, 'error', 'errors')}`)
if (updatedCmds) info.push(`${updatedCmds} updated ${grammar(updatedCmds, 'command', 'commands')}`)
if (newCmds) info.push(`${newCmds} new ${grammar(newCmds, 'command', 'commands')}`)

const changeEmbed = new MessageEmbed()
.setTitle(`Manami v${version}`)
.setDescription(`Its Here! Manami v${version}, with ${info.join(', ')} and much more!`)
.addFields(fields)

embed.embed('Are You Sure?', 'Are you sure you want to send this change-log?\nSay yes or no to coninue', message)
message.channel.send(changeEmbed).then(() => {

    const filter = m => m.author.id == message.author.id && (m.content == 'yes' || m.content == 'no');
    client.awaitMessage(message.channel.id, filter, 1, 15000).then(msg => {
        msg = msg.first()
        if (msg.content == 'no') {
            embed.error('Cancled The Change-Log', 'Succesfully cancled the change-log', message)
        } else {
            changeChannel.send(changeEmbed)
            changeChannel.send('<@&829417625708003338>').then(msg => {
                msg.delete()
            })
            embed.succes('Succesfully Sent The Change-Log', `Succesfully sent the change-log for Manami v${version}`, message)
        }
    }).catch(err => {
        embed.error('Timeout', 'You took to long to reply!', message)
    })
})
}
}