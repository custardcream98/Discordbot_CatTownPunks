exports.config = {
    name: 'ping',
    // aliases: ['aliases', 'aliases1', 'aliases2'], // 추가로 명령어 지정 가능
    category: ['bot'],
    des: ['Ping Pong!'], // 명령어 설명
    use: ['/ping을 치시면...?'] // 추후 help 명령어 추가 예정
}
exports.run = (client, msg, args) => {
    msg.reply(`Pong!`);
};