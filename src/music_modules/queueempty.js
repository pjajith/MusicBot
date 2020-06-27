const Discord = require('discord.js');

module.exports = (message) => {
    const qemptyEmbed = new Discord.MessageEmbed()
        .setTitle('Music :musical_note:')
	    .addFields(
            { name: ':octagonal_sign:  Queue Empty', value: 'GoodBye Human' },
        );
    message.channel.send(qemptyEmbed);
}