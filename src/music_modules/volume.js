const errorText = require('./errorText.js');
const Discord = require('discord.js');

module.exports = (args,message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    if(!args[1] || isNaN(args[1]) || parseInt(args[1])< 0){
        errorText(message,'Invalid number/No number specified setting Max Volume instead\nSetting volume to  <:volG:726334847773048883>100%');
        server.dispatcher.setVolume(1);
    }
    else if(args[1]>100){
        errorText(message,'Setting volume to  <:volG:726334847773048883>100% instead');
        server.dispatcher.setVolume(1);
    }
    else{
        var volumeEmoji = '<:volG:726334847773048883>';
        if(args[1]<=25){
            volumeEmoji = '<:volR:726335447361519686>';
        }else if(args[1]<=50){
            volumeEmoji = '<:volO:726335156474085466>';
        }else if(args[1]<=75){
            volumeEmoji = '<:volY:726334847496355896>';
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