const { Client, Interaction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const ee = require("../config.json")
module.exports = {
    name: "interactionCreate",
    /**
 * @param {Client} client
 * @param {Interaction} interaction
 */
    async run(interaction, client) {
        if (interaction.isCommand()) {
            if (interaction.channel.type === "DM") return interaction.reply({ content: `You can't use Slash Commands in DMS!` }).catch(err => console.log("An error has accured"))
            if (!interaction.channel.permissionsFor(interaction.guild.members.me).has("SEND_MESSAGES")) return interaction.reply({ content: `I don't have permission to send message here!`, ephemeral: true })
            const cmd = client.slashCommands.get(interaction.commandName)
            if (!cmd)
                return interaction.reply({ content: `An error has accured`, ephemeral: true }).catch(() => null)

            return cmd.run(client, interaction)
        }
    }
}
