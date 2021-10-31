const { glob } = require("glob")
const { promisify } = require("util")
const ascii = require('ascii-table')
let table = new ascii("Slash-Commands");
table.setHeading('Slash-Command', ' Load status');
const fs = require("fs")
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
    const buttonFolders = fs.readdirSync(`./slashcommands`)
    for (const folder of buttonFolders) {
        const buttonsFiles = fs.readdirSync(`./slashcommands/${folder}`).filter(file => file.endsWith('.js'))
        for (const file of buttonsFiles) {
            const button = require(`../slashcommands/${folder}/${file}`)
            if (button.name) {
                table.addRow(file, '✅')
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
            }
        }
    }
    console.log(table.toString());
}