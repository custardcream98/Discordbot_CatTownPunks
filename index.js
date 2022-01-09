const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const fs = require('fs')
// const { token, clientId } = require('./config.json');
// client.login(token);
client.login(process.env.TOKEN);// 토큰 수정

client.on("ready", () => {
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`);
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/Bot/CatTownPunks').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/Bot/CatTownPunks/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    console.log(`${command.data.name} 로드 완료`);
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

    if (!interaction.isCommand) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        //await interaction.reply({ content: 'ERROR! Please contect to @ova', ephemeral: true });
    }
})