const Discord = require("discord.js");
const axios = require('axios');
const client = new Discord.Client();
const fs = require('fs')
const config = require("./config.json")
const prefix = '/';

client.on("ready", () => {
    console.log(`${client.user.tag} 봇에 로그인 하였습니다!`);
});
client.commands = new Discord.Collection() // commands를 discord.collection을 사용하였습니다.
client.aliases = new Discord.Collection()// aliases를 discord.collection을 사용하였습니다.

fs.readdirSync("./commands/").forEach(dir => {
    fs.readdirSync(`./commands/${dir}`).forEach(type => {
        const Filter = fs.readdirSync(`./commands/${dir}/${type}`).filter(f => f.endsWith(".js"));

        Filter.forEach(file => {
            const cmd = require(`./commands/${dir}/${type}/${file}`);
            client.commands.set(cmd.config.name, cmd)
            console.log(`${cmd.config.name} 로드 성공`);
            // for (let alias of cmd.config.aliases) { // alias를 선언하고 cmd안에 있는 config.aliases가 여러개 있을텐데 그것들을 for로 반복합시다
            //     client.aliases.set(alias, cmd.config.name) // 콜렉션으로 지정한 것들을 다 넣어줍시다
            // }
        })
    })
})


function runCommand(command, message, args) { // 명령어를 실행할 때 쓸 함수
    if (client.commands.get(command) || client.aliases.get(command)) {
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if (cmd) cmd.run(client, message, args);
        return;
    }
}

client.on("message", async msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    if (msg.content.slice(0, prefix.length) !== prefix) return;

    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase(); // 커멘드에 대한 이름을 선언

    try {
        runCommand(command, msg, args); // 위에서 함수로 선언한 것을 command, msg(message), args(argument)를 불러와 명령어를 실행
    } catch (e) {
        console.error(e);
    }
})

client.login(config.token);