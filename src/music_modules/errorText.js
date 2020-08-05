const Discord = require('discord.js');
const emoji = require('../config/emoji.js');
module.exports =(message,errorText) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
    .setColor('0xFF1A00')
	.addFields(
            { name: 'ERROR!', value: errorText }
    );
    message.reply(embed);
} 