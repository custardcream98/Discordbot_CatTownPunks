const axios = require('axios');
const fs = require('fs');

async function FindMyCat(cat_num) {
    var result = {};
    let parsed = await axios.get(`https://token.cattownpunks.com/k-cat-town-punks/${cat_num}`);
    parsed = parsed.data;
    console.log(parsed);

    result['isOK'] = true;
    var attr = parsed.attributes;
    for (var att in attr) {
        if (attr[att].trait_type == "Rarity") {
            result['Rarity'] = attr[att].value;
        } else if (attr[att].trait_type == "Background") {
            result['Background'] = attr[att].value;
        } else if (attr[att].trait_type == "Shape") {
            result['Shape'] = attr[att].value;
        } else if (attr[att].trait_type == "Neck") {
            result['Neck'] = attr[att].value;
        } else if (attr[att].trait_type == "Face") {
            result['Face'] = attr[att].value;
        } else if (attr[att].trait_type == "Eyes") {
            result['Eyes'] = attr[att].value;
        } else if (attr[att].trait_type == "Hat") {
            result['Hat'] = attr[att].value;
        } else if (attr[att].trait_type == "Hand") {
            result['Hand'] = attr[att].value;
        } else if (attr[att].trait_type == "Handing") {
            result['Handing'] = attr[att].value;
        }
    }

    result['cat_name'] = parsed['name'];
    result['cat_img'] = parsed['image'];
    result['opensea_url'] = "https://opensea.io/assets/klaytn/0x3bb88f83b6b9c6286daa7dd2d1412ed2a5510c90/" + String(cat_num);
    result['cat_profile'] = "https://cattownpunks.com/cat-profile/" + String(cat_num);

    return result;
}

exports.config = {
    name: 'cat',
    // aliases: ['aliases', 'aliases1', 'aliases2'], // 추가로 명령어 지정 가능
    category: ['bot'],
    des: ['Find Your Cat!'], // 명령어 설명
    use: ['/cat (your cat number) ex: /cat 18602'] // 추후 help 명령어 추가 예정
}

exports.run = async (client, msg, args) => {
    if (!args[0] || isNaN(args[0])) return msg.reply("❎ Please type the cat's number");

    let cat_num = args[0];
    let cat = await FindMyCat(cat_num);

    msg.reply(cat.cat_name);
    msg.channel.send(cat.cat_img);
};