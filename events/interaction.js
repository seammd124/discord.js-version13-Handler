const client = require("../index")
const { MessageEmbed } = require("discord.js")
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: true }).catch(err => console.log(err))
        if (interaction.channel.type === "DM") return interaction.followUp({ content: `You can't use Slash Commands in DMS!` }).catch(err => console.log("An error has accured"))
        if (!interaction.channel.permissionsFor(client.user.id).has(["EMBED_LINKS", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS", "USE_APPLICATION_COMMANDS", "ADD_REACTIONS", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"])) {
            const embed = new MessageEmbed()
                .setTitle(`Missing Permissions For \`${interaction.channel.name}\` This Channel!`)
                .setDescription(`I need these permissions for That channel!\n\`EMBED_LINKS, USE_EXTERNAL_EMOJIS, USE_EXTERNAL_STICKERS, USE_SLASH_COMMANDS, ADD_REACTIONS, READ_MESSAGE_HISTORY, SEND_MESSAGES\``)
                .setColor("#ec0303")
                .setTimestamp()
            interaction.followUp({ content: `Check DMS!` }).catch(err => console.log(err))
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (!member) return
            return member.send({ embeds: [embed] }).catch(err => console.log(`Cannot Send Message to this user!`))
        }
        const cmd = client.slashCommands.get(interaction.commandName)
        if (!cmd) return interaction.followUp({ content: `An error has accured` })
        if (cmd) cmd.run(client, interaction)
    }
})