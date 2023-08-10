const { glob } = require("glob")
const { promisify } = require("util")
const globPromise = promisify(glob)
module.exports = (client) => {
    client.on("ready", async () => {
        const slashCommands = await globPromise(`${process.cwd()}/slashcommands/*/*.js`)
        const arrayofSlashCommands = []
        slashCommands.map((value) => {
            const file = require(value)
            if (!file?.name) return;
            client.slashCommands.set(file.name, file)

            if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
            arrayofSlashCommands.push(file)

        })
        await client.application.commands.set(arrayofSlashCommands)
    })
}
