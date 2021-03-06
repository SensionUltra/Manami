const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix: defultPrefix } = require('@root/config.json')

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  cooldown: 3000,
  run: async (client, message, args) => {
    const cmd = client.categories.filter(cat => cat.name == 'music').forEach(category => {
      category.cmds.map(cmd => cmd.name)
      })
    const prefix = message.guild.prefix || defultPrefix
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir == 'owner') return
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField(
          "Support Server",
          "[Click Here](https://discord.gg/gt4PacB3A8)",
          true
        )
        .addField(
          "VoidBots",
          "[Click Here](https://voidbots.net/bot/817653964161548289/vote)",
          true
        )
        .addField(
          "Invite Link",
          "[Click Here](https://discord.com/oauth2/authorize?client_id=817653964161548289&scope=bot&permissions=8)",
          true
        )
        .addField(
          "Top.gg",
          "[Click Here](https://top.gg/bot/817653964161548289)",
          true
        )
        .setImage("https://cdn.discordapp.com/attachments/815599691654889492/828162155978293278/ManamiEz.gif")
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
        if (command?.owner) {
          command = undefined
        }
        if (!command) {
          command = client.categories.get(args[0].toLowerCase())
          if (!command) {
            const embed = new MessageEmbed()
              .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
              .setColor("FF0000");
            return message.channel.send(embed);
          }
          const embed = new MessageEmbed()
          .setTitle('Command Catagory:')
          .addFields(
            {name: `Catagory Name`, value: command.name},
          )
          .addField(
            "Commands:",
            cmd
          )
          console.log(cmd)
          return message.channel.send(embed)
        }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases Provided."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description Provided."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.reply(embed);
    }
  },
};