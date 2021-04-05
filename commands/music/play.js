module.exports = {
name: "play",
description: "play music :slight_smile:",
cooldown: 3000,
run: async(client, message, args) => {
    const search = await client.manager.search(args, message.author);
    const player = client.manager.create({
        guild: message.guild.id,
        textChannel: message.channel.id,
        voiceChannel: message.member.voice.channelID,
    });
    switch(search.loadType) {
        case "TRACK_LOADED":
            player.connect()
            player.queue.add(search.tracks[0])
            message.channel.send(`Added ${search.tracks[0].title}`);
            if (!player.playing && !player.paused && !player.queue.size)
            player.play()
            break;
        case "SEARCH_RESULT":
            player.connect()
            player.queue.add(search.tracks[0])
            message.channel.send(`Added ${search.tracks[0].title}`);
            if (!player.playing && !player.paused && !player.queue.size)
            player.play();
            break;
            case "PLAYLIST_LOADED":
                player.connect()
                player.queue.add(search.tracks);
                message.channel.send(`Added ${search.playlist.name} to the queue!`)
                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                  )
                    player.play();
                    break;
                    case "NO_MATCHES":
                    if(!player.queue.current) player.destroy()
                    message.channel.send("No results matched your query")
                    break;
                    case "LOAD_FAILED":
                        if(!player.queue.current) player.destroy()
                    message.channel.send("Something went wrong ")
                    break;
                }
    }

}