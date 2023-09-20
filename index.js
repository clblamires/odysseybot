require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client(
    { 
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ] 
    }
);
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter( file => file.endsWith('.js'));

for ( const file of commandFiles ){
    const filePath = path.join(commandsPath, file );
    const command = require(filePath);
    if( 'data' in command && 'execute' in command ) {
        client.commands.set(command.data.name, command );
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing or isn't build right!`);
    }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


client.on(Events.InteractionCreate, async interaction => {
    if ( !interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if( !command ){
        console.error(`No command matching ${interaction.commandName} was found.`)
    }
    try {
        await command.execute(interaction);
    }
    catch (error ) {
        console.error(error);
        if( interaction.replied || interaction.deferred ){
            await interaction.followUp({
                content: "There was an error executing this command.",
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: "There was an error executing this command.",
                ephemeral: true
            })
        }
    }
});

client.on(`messageCreate`, msg => {
    if( msg.author.bot ) return;
   

    msg.channel.send({ files: ["./images/" + "changethefates.jpeg"] });

    // if( msg.content == "!clio") {
    //     msg.reply("Clio says...");
    // } else {
    //     msg.reply("Nope, not clio");
    // }

    // msg.reply("This is a reply");
})

// Log in to Discord with your client's token
client.login(process.env.CLIENT_TOKEN);

