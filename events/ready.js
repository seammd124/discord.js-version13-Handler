const client = require('../index')
client.on("ready", () => {
    console.log(`${client.user.tag} is Online!`)
    client.user.setActivity(`RedZone OP!`, {
        type: "WATCHING"
    })
    client.user.setStatus("dnd")
})