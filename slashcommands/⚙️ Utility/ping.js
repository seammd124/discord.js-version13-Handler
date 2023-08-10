const { MessageEmbed, Client, CommandInteraction } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Check Bot's Ping!",
    category: `⚙️ Utility`,
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply().catch(() => null)
        const reply = await interaction.fetchReply()
        var yourping = reply.createdTimestamp - interaction.createdTimestamp
        var botping = Math.round(client.ws.ping)
        return interaction.editReply({ content: `\`\`\`xl\n latency: ${yourping.toString().replace('-', "")}ms.\n API latency: ${botping}ms.\`\`\`` })
    }
}