const { MessageEmbed } = require('discord.js');
const { post } =  require('node-superfetch')
const SourceBin = require('sourcebin-wrapper')
module.exports = {
name: "eval",
owner: true,
description: "basically a very dangerous cmd",
run: async(client, message, args) => {
    const embed = new MessageEmbed()
    .addField("📥 Input", "```js\n" + args.join(" ") + "```");

    try {
        const code = args.join(" ");
        if (!code) return message.channel.send("Please provide some code to evaluate")
        let evaled;
        //If someone attempts to get the bot token
        if (code.includes(`BOTTOKEN`) || code.includes(`TOKEN`) || code.includes("process.env")) {
            evaled = "No, stop, what are you gonna do with it?"
        } else {
            evaled = eval(code)
        }

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});

        let output = clean(evaled);
        if (output.length > 1024) {
            // If output exceeds 1024 characters then we will put it into a hastebin
            SourceBin.create([
                new SourceBin.BinFile({
                    name: 'Evaled Content',
                    content: output,
                    languageId: 'js'
                })
            ], {
                title: 'Content',
                description: 'This is awesome'
            })
                .then((result) => {
                    const url = result.url;
                    const embed2 = new MessageEmbed()
                    .addField("📥 Input", "```js\n" + args.join(" ") + "```")
                    .addField("📤 Output", "```js\n" + url + "```").setColor(0x7289DA)

                    message.channel.send(embed2)
                    return;
                });
            
        } else {
            embed.addField("📤 Output", "```js\n" + output + "```").setColor(0x7289DA)

            message.channel.send(embed)
        }



    } catch (error) {
        
        let err = clean(error)
        if (err.length > 1024) {
            // Same thing as above
            SourceBin.create([
                new SourceBin.BinFile({
                    name: 'Evaled Content',
                    content: error,
                    languageId: 'js'
                })
            ], {
                title: 'Content',
                description: 'This is awesome'
            })
                .then((result) => {
                    const url = result.url;
                    const embed3 = new MessageEmbed()
                    .addField("📥 Input", "```js\n" + args.join(" ") + "```")
                    .addField("📤 Output", "```js\n" + url + "```").setColor(0x7289DA)

                    message.channel.send(embed3)
                    return;
                })
        } else {
            embed.addField("📤 Output", "```js\n" + error + "```").setColor(0x7289DA)
        }

        message.channel.send(embed)
    }
}
};

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(process.env.BOTTOKEN, 'ODIyOTU4MjAwNTE2--NO--zU3.--TOKEN--.L7VV3F--4U--MrBjRSSGomtzytmw')
        .replace(process.env.DEVBOTTOKEN, 'ODIyOTU4MjAwNTE2--NO--zU3.--TOKEN--.L7VV3F--4U--MrBjRSSGomtzytmw')
    } else {
        return string;
    }
}