const errorText = require('./errorText.js');
const Discord = require('discord.js');
const emoji = require('../config/emoji.js');

module.exports = (args,message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    if(!args[1] || isNaN(args[1]) || parseInt(args[1])< 0){
        errorText(message,'Invalid number/No number specified setting Max Volume instead\nSetting volume to  '+emoji.volG+'100%');
        server.dispatcher.setVolume(1);
    }
    else if(args[1]>100){
        errorText(message,'Setting volume to  '+emoji.volG+'100% instead');
        server.dispatcher.setVolume(1);
    }
    else{
        var volumeEmoji = emoji.volG;
        if(args[1]<=25){
            volumeEmoji = emoji.volR;
        }else if(args[1]<=50){
            volumeEmoji = emoji.volO;
        }else if(args[1]<=75){
            volumeEmoji = emoji.volY;
        }
        server.dispatcher.setVolume(args[1]/100);
        const volEmbed = new Discord.MessageEmbed()
        .setTitle('Music :musical_note:')
	    .addFields(
            { name: 'Volume', value: 'Setting volume to '+volumeEmoji+args[1]+'%' },
        );
        message.channel.send(volEmbed);
    }
}