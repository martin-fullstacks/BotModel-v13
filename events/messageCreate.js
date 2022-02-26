const client = require("..");
var config = require("../settings/config.json");
const { MessageEmbed } = require("discord.js");

client.on("messageCreate", async (message) => {
    let prefix = config.prefix;
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
        client.commands.get(cmd.toLowerCase()) ||
        client.commands.find(
            (cmds) => cmds.aliases && cmds.aliases.includes(cmd)
        );
    if (!command) return;
    if (command) {
        if (!message.member.permissions.has(command.permissions || [])) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed.color)
                        .setDescription(
                            `❌ Tu n'as pas la permission **${command.permissions}** d'utiliser la commande **${command.name}.** `
                        ),
                ],
            });
        }
        command.run(client, message, args, prefix);
    }
});
