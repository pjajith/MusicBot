const errorText = require('./errorText.js');
const Discord = require('discord.js');
module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    var text ='';
    if(!server.dispatcher.paused){
        text = 'Not paused';
    }else{
        server.dispatcher.resume();
        text = 'Resumed!';
    }
    const resumeEmbed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
	.addFields(
        { name: '<:play:726333947763490866>  Resume Status', value: text },
    );

    message.channel.send(resumeEmbed);
}