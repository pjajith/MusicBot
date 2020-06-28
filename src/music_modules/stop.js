const errorText = require('./errorText.js');
const Discord = require('discord.js');
module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    server.dispatcher.destroy();
    server.queue = [];
    message.member.voice.channel.join().then((connection) =>{
        const exitEmbed = new Discord.MessageEmbed()
        .setTitle('Music :musical_note:')
        .setColor('0xFF1A00')
	    .addFields(
            { name: ':octagonal_sign:   Stopping Player', value: 'GoodBye Human' },
        );
        message.channel.send(exitEmbed);
        delete server.dispatcher;
        connection.disconnect();
    });
}