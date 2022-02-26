const { Client } = require("discord.js");
const fs = require("fs");

module.exports = (client) => {
    try {
        fs.readdirSync("./events/").forEach((file) => {
            const events = fs
                .readdirSync("./events/")
                .filter((file) => file.endsWith(".js"));
            for (let file of events) {
                let pull = require(`../events/${file}`);
                if (pull.name) {
                    client.events.set(pull.name, pull);
                }
            }
            console.log(`\x1b[32m[HANDLERS]\x1b[33m ${file} chargé !`);
        });
    } catch (e) {
        console.log(e.message);
    }
};
