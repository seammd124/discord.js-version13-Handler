const fs = require("fs")

module.exports = (client) => {

    const folder = fs.readdirSync(`./events/`).filter(file => file.endsWith('.js'));

    for(let file of folder) {
        let pull = require(`../events/${file}`)

        client.on(pull.name, (...args) => pull.run(...args, client))
        continue
    }
}