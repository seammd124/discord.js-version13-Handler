const { Client, Message, Collection } = require("discord.js")
const ee = require("../config.json")
module.exports = {
    name: "messageCreate",
    /**
 * @param {Client} client
 * @param {Message} message
 */
    async run(message, client) {
        try {
            if (message.author.bot) return;
            if (message.channel.type === "DM") return
            let prefix = ee.prefix

            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
            if (!prefixRegex.test(message.content)) return
            const [, matchedPrefix] = message.content.match(prefixRegex);
            if (!message.channel.permissionsFor(message.guild.members.me).has("SEND_MESSAGES")) return
            if (!message.guild) return;
            var args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
            const cmd = args.shift().toLowerCase();
            if (cmd.length == 0) {
                if (matchedPrefix.includes(client.user.id)) {
                    return message.channel.send({ content: `My prefix for \`${message.guild.name}\` is: **${prefix}**` })
                }
                return
            }
            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            if (!command) return
            if (command) {
                return command.run(client, message, args, prefix)
            }

        } catch (err) {
            return console.log(err)
        }
    }
}
function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
        console.log(String(e.stack))
    }
}