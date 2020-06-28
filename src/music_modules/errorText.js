const Discord = require('discord.js');
module.exports =(message,errorText) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
    .setColor('0xFF1A00')
	.addFields(
            { name: 'ERROR!', value: errorText }
    );
    message.reply(embed);
} 