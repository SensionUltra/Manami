const { MessageAttachment } = require("discord.js");
const { inspect } = require('util')
module.exports = {
name: "eval",
owner: true,
description: "basically a very dangerous cmd",
run: async(client, message, args) => {
   const msg = message;
   if (!args.length) return msg.channel.send('I need some code to evaluate');
   let code = args.join(' ');
   code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
   let evaled;
   try {
       const start = process.hrtime();
       evaled = eval(code);
       if (evaled instanceof Promise) {
           evaled = await evaled;
       }
       const stop = process.hrtime(start);
       const respone = [
           `**Output:** \`\`\`js\n${(inspect(evaled, { depth:  0}))}\n\`\`\``,
           `**Time Taken:** \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
       ]
       const res = respone.join('\n')
       if (res.length < 2000) {
           await msg.channel.send(res)
       } else {
           const output = new MessageAttachment(Buffer.from(res), 'output.txt');
           await msg.channel.send(output)
       }
   } catch (e) {
       return message.channel.send(`Error has occured: \`\`\`\n${e}\n\`\`\``)
   }
},

clean(text) {
    if (typeof text === 'string') {
        text = text
        .replace(/`/g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`)
        .replace(new RegExp(this.client.token, 'gi'), '****')
    }
    return text;
}
};