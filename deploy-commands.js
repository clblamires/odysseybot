const { REST, Routes } = require("discord.js");
require('dotenv').config();
const fs = require("node:fs");
const path = require('node:path');

const commands = [];

// lets try this instead
const ping = require('./commands/ping');
if( 'data' in ping && 'execute' in ping ){
    commands.push(ping.data.toJSON());
} else {
    console.error("Your slash command is missing some stuff");
}

const rest = new REST().setToken(process.env.CLIENT_TOKEN);

( async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands`);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID ),
            { body: commands }
        )
        console.log(`Successfully reloaded ${data.length} application (/) commands`);
    } catch(error){
        console.error(error);
    }
})();