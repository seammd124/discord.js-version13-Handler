const client = require("../index")
const prefix = require("../config.json").prefix
const { MessageEmbed } = require("discord.js")
client.on("messageCreate", async message => {
    try {
        if (message.author.bot) return;
        if (message.channel.type === 'DM') return
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        if (!message.channel.permissionsFor(client.user.id).has(["EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS", "USE_APPLICATION_COMMANDS", "ADD_REACTIONS", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"])) {
            const embed = new MessageEmbed()
                .setTitle(`Missing Permissions For \`${message.channel.name}\` This Channel!`)
                .setDescription(`I need these permissions for That channel!\n\`EMBED_LINKS, USE_EXTERNAL_EMOJIS, USE_EXTERNAL_STICKERS, USE_SLASH_COMMANDS, ADD_REACTIONS, READ_MESSAGE_HISTORY, SEND_MESSAGES\``)
                .setColor("#ec0303")
                .setTimestamp()
            const member = await message.guild.members.fetch(message.author.id)
            if (!member) return
            return member.send({ embeds: [embed] }).catch(err => console.log(`Cannot Send Message to this user!`))
        }
        if (!message.guild) return;
        if (!message.member) message.member = await message.guild.members.fetch(message);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();
        if (cmd.length == 0) {
            if (matchedPrefix.includes(client.user.id)) {
                if (!message.channel.permissionsFor(client.user.id).has(["SEND_MESSAGES", "EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS"])) {
                    const embed = new MessageEmbed()
                        .setTitle(`Missing Permissions For \`${message.channel.name}\` This Channel!`)
                        .setDescription(`I need these permissions for That channel!\n\`SEND_MESSAGES, EMBED_LINKS, USE_EXTERNAL_EMOJIS, USE_EXTERNAL_STICKERS\``)
                        .setColor("#ec0303")
                        .setTimestamp()
                    const member = await message.guild.members.fetch(message.author.id)
                    if (!member) return
                    return member.send({ embeds: [embed] }).catch(err => console.log(`Cannot Send Message to this user!`))
                }
                const embed = new MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle(`My PREFIX : \`${prefix}\``)
                    .setColor("b9a30d")
                message.channel.send({ embeds: [embed] })
            }
            return
        }
        let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if (!command) return message.channel.send({ embeds: [new MessageEmbed().setDescription(`Unknown Command!`).setColor("RED")] })
        if (command) command.run(client, message, args, prefix)

    } catch (err) {
        console.log(err)
    }
});
function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
        console.log(String(e.stack))
    }
}