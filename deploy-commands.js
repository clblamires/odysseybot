const { REST, Routes } = require("discord.js");
require('dotenv').config();
const fs = require("node:fs");
const path = require('node:path');

const commands = [];

/*const commandsPath = path.join(__dirname, "commands");
fs.readdir(commandsPath, (err, files) => {
    if( err ){
        console.error(error);
        return;
    }
    files.forEach( (file) => {
        const commandURL = path.join('commands', file );
        // console.log("Command URL: ", commandURL );
        const command = require("./" + commandURL);
        if( 'data' in command && 'execute' in command ){
            commands.push(command.data.toJSON());
            console.log("Hey we got here!");
            console.log(commands.length);
        } else {
            console.error("Your slash command is missing some stuff");
        }
    })
})*/



const ping = require('./commands/ping');
const game = require('./commands/game')
commands.push(ping.data.toJSON());
commands.push(game.data.toJSON());




const rest = new REST().setToken(process.env.CLIENT_TOKEN);

( async () => {
    console.log("Commands: " , commands.length);
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
