const { REST, Routes } = require("discord.js");
require('dotenv').config();
const fs = require("node:fs");
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
// 	// Grab all the command files from the commands directory you created earlier
// 	const commandsPath = path.join(foldersPath, folder);
//     console.log("Commands path: ", commandsPath );
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// 	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
//         console.log("File path: ", filePath)
// 		if ('data' in command && 'execute' in command) {
// 			commands.push(command.data.toJSON());
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }

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