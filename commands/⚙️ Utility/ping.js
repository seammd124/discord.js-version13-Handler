const { Client, Message, MessageEmbed } = require("discord.js")
module.exports = {
    name: "ping",
    description: "Ping Command",
    aliases: [''],
    /**
  * @param {Message} message
  * @param {Client} client
  */
    async run(client, message, args, prefix) {
        const embed = new MessageEmbed()
            .setDescription(`WebSocket Ping ${client.ws.ping}ms!`)
            .setColor("RANDOM")
        return message.channel.send({ embeds: [embed] })
    }
}