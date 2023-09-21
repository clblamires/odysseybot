const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("game")
        .setDescription("Announces the game and posts a link to Foundry"),
        async execute(interaction){
            let url = "https://chilebean15.foundryserver.com/join";
            let content = "@everyone We're ready to play! " + url;
            await interaction.reply( content )
        }
}