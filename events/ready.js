const { Client, version } = require("discord.js")
module.exports = {
    name: "ready",
    /**
 * @param {Client} client
 */
    async run(client) {
        console.table({
            'Bot User:': `${client.user.tag}`,
            'Prefix:': `$`,
            'Shards': `${client.options.shardCount}`,
            'Commands:': `${client.slashCommands.size}`,
            'Discord.js:': `v${version}`,
            'Node.js:': `${process.version}`,
            'Plattform:': `${process.platform} ${process.arch}`,
            'Memory:': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
        })
    }
}