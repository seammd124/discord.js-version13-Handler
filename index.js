const { Client, LimitedCollection, Collection } = require("discord.js")
const fs = require("fs")
require("dotenv").config()
const client = new Client({
    partials: ["GUILD_MEMBER", "MESSAGE", "CHANNEL", "REACTION"],
    allowedMentions: { parse: ["roles", "users"], repliedUser: true },
    restTimeOffset: 0,
    intents: ["GUILDS", "GUILD_VOICE_STATES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]
})
client.options.makeCache = manager => {
    switch (manager.name) {
        // Disable Cache
        case 'GuildEmojiManager':
        case 'GuildBanManager':
        case 'GuildInviteManager':
        case 'GuildStickerManager':
        case 'StageInstanceManager':
        case 'PresenceManager':
        case 'ThreadManager': return new LimitedCollection({ maxSize: 0 });
        // TLRU cache, Lifetime 30 minutes
        case 'MessageManager': return new LimitedCollection({ maxSize: 1 });
        // Default cache
        default: return new Collection();
    }
};
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection()
client.slashcategories = fs.readdirSync("./slashcommands/");
client.categories = fs.readdirSync("./commands/");
["slash", "events", "command", "anticrash"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
})

client.login(process.env.TOKEN)