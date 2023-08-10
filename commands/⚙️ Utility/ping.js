const { Client, Message, MessageEmbed } = require("discord.js")
const ee = require("../../config.json")
module.exports = {
  name: "ping",
  description: "Ping Command",
  category: `⚙️ Utility`,
  aliases: [''],
  /**
* @param {Message} message
* @param {Client} client
*/
  async run(client, message, args, prefix) {
    var yourping = new Date().getTime() - message.createdTimestamp
    var botping = Math.round(client.ws.ping)
    message.channel.send(`\`\`\`xl\n latency: ${yourping.toString().replace('-', "")}ms.\n API latency: ${botping}ms.\`\`\``)
  }
}