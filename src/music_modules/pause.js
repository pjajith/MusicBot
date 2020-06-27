const Discord = require('discord.js');
const errorText = require('./errorText.js');

module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel || message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    var text ='';
    if(server.dispatcher.paused){
        text = 'Already Paused'
    }else{
        server.dispatcher.pause();
        text = 'Paused!!';
    }

    const pauseEmbed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
	.addFields(
        { name: '<:pause:726332561537630208>  Pause Status', value: text },
    )
    .setDescription('Use resume to resume playing!');

    message.channel.send(pauseEmbed);
}