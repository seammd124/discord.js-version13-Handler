const { MessageEmbed, Client, CommandInteraction } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Pong!",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
            .setDescription(`WebSocket Ping ${client.ws.ping}ms!`)
            .setColor("RANDOM")
        return interaction.followUp({ embeds: [embed] })
    }
}