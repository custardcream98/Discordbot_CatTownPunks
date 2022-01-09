const axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

async function FindMyCat(cat_num) {
    var result = {};
    let parsed = await axios.get(`https://token.cattownpunks.com/k-cat-town-punks/${cat_num}`)
        .catch(error => {
            console.log(error);
            return;
        });
    parsed = parsed.data;

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

    result['cat_name'] = parseInt(parsed['name'].split('#')[1]) == cat_num ? parsed['name'] : `${parsed['name']} #${cat_num}`;
    result['cat_img'] = parsed['image'];
    result['opensea_url'] = "https://opensea.io/assets/klaytn/0x3bb88f83b6b9c6286daa7dd2d1412ed2a5510c90/" + String(cat_num);
    result['cat_profile'] = "https://cattownpunks.com/cat-profile/" + String(cat_num);

    return result;
}

async function makeEmbedMsg(cat) {
    const mint = '#9effdf';

    let embedMsg = new MessageEmbed()
        .setTitle(cat.cat_name)
        .setColor(mint)
        .setURL(cat.cat_profile)
        .setThumbnail(cat.cat_img)
        .addFields(
            { name: 'Rarity', value: cat.Rarity },
            { name: 'Background', value: cat.Background, inline: true },
            { name: 'Shape', value: cat.Shape, inline: false },
            { name: 'Neck', value: cat.Neck, inline: true },
            { name: 'Face', value: cat.Face, inline: false },
            { name: 'Eyes', value: cat.Eyes, inline: true },
            { name: 'Hat', value: cat.Hat, inline: false },
            { name: 'Hand', value: cat.Hand, inline: true },
            { name: 'Handing', value: cat.Handing, inline: false }
        );
    return embedMsg;
}

async function makeBtn(cat) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('📒 Cat Profile')
                .setURL(cat.cat_profile)
        )
        .addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setLabel('⚓ OpenSea Profile')
                .setURL(cat.opensea_url)
        );
    return row;
}

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Find Your Cat!')
        .addIntegerOption(option =>
            option
                .setName('cat-number')
                .setDescription('The number of your Cat!')
                .setRequired(true)
                .setMaxValue(20000)
                .setMinValue(1)
        ),
    async execute(interaction) {
        await catCommand(interaction);
    },
};

async function catCommand(interaction) {
    let cat_num = interaction.options.getInteger('cat-number');
    let cat = await FindMyCat(cat_num)
        .catch(error => console.log(error));
    console.log(`${interaction.user.username} triggered catCommand : ${cat.cat_name}`);

    let embed = await makeEmbedMsg(cat);
    let row = await makeBtn(cat);

    await interaction.reply({ embeds: [embed], components: [row] });
}