const Discord = require('discord.js');
module.exports =(message,successText) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
	    .addFields(
            { name: 'SUCCESS!', value: successText }
        );
    message.reply(embed);
} 