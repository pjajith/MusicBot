const Discord = require('discord.js');
const emoji = require('../config/emoji.js');
module.exports =(message,successText) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
    .setColor('0x00FF99')
	    .addFields(
            { name: 'SUCCESS!', value: successText }
        );
    message.reply(embed);
} 