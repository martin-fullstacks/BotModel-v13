const { Client } = require("discord.js");
const fs = require("fs");

module.exports = (client) => {
    try {
        let command = 0;
        fs.readdirSync("./commands").forEach((cmd) => {
            let commands = fs
                .readdirSync(`./commands/${cmd}/`)
                .filter((file) => file.endsWith(".js"));
            for (cmds of commands) {
                let pull = require(`../commands/${cmd}/${cmds}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    command++;
                } else {
                    console.log(`${cmds} Cette commande n'est pas prête !`);
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases))
                    pull.aliases.forEach((alias) =>
                        client.aliases.set(alias, pull.name)
                    );
            }
        });
        console.log(`\x1b[32m[COMMANDS]\x1b[33m ${command} commandes chargé !`);
    } catch (e) {
        console.log(e.message);
    }
};
