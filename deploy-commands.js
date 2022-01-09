const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('./config.json');

const commands = [];
// let commandFiles = fs.readdirSync('./commands/Bot/CatTownPunks').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//     const command = require(`./commands/Bot/CatTownPunks/${file}`);
//     commands.push(command.data.toJSON());
// }

let commandFiles = fs.readdirSync('./commands/Bot/CatTownPunks').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/Bot/CatTownPunks/${file}`);
    commands.push(command.data.toJSON());
    console.log(`${command.data.name} push 완료`);
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();