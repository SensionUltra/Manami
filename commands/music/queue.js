const { MessageEmbed } = require("discord.js");

module.exports = {
name: "queue",
aliases: ["whatsplayingdog"],
description: "See the current guild queue",

run: (client, message, args) => {
    const text = args.join(' ')
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.inlineReply("`❌` There is no player in this guild", { allowedMentions: { repliedUser: false }});

    const queue = player.queue

    const embedQueue = new MessageEmbed()
    .setTitle("Server Queue!")

    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embedQueue.addField("**Current Song**", `[${queue.current.title}](${queue.current.uri})`);

    if (!tracks.length) embedQueue.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
    else embedQueue.setDescription(tracks.map((track, i) => `**${start + (++i)}** [${track.title}](${track.uri})`).join("\n"));

    const maxPages = Math.ceil(queue.length / multiple);

    embedQueue.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

    return message.reply(embedQueue);
}}