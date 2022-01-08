const axios = require('axios');

exports.config = {
    name: 'fp',
    // aliases: ['aliases', 'aliases1', 'aliases2'], // 추가로 명령어 지정 가능
    category: ['bot'],
    des: ['Find Cat Town Punk Floor Price on Open Sea'], // 명령어 설명
    use: ['/fp (Rarity) ex: /fp common'] // 추후 help 명령어 추가 예정
}
exports.run = (client, msg, args) => {
    msg.reply(`Pong!`);
};