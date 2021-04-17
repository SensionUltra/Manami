module.exports = (txt, member, leave) => {
    let text = txt.replace('{member}', leave ? `${member.user.username}#${member.user.discriminator}` : `<@${member.id}>`)
    .replace('{servername}', `${member.guild.name}`)
    .replace('{membercount}', `${member.guild.members.cache.size}`)
    return text
}