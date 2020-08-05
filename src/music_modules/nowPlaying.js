const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const errorText = require('./errorText.js');
const emoji = require('../config/emoji.js');

module.exports = async (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel || message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    const nowPlayingEmbed = new Discord.MessageEmbed();
    if(server.queue[0]){
        var songInfo =  await ytdl.getInfo(server.queue[0]);

        nowPlayingEmbed
        .setTitle('Music :musical_note:')
	    .addFields(
            { name: 'Now Playing', value: emoji.play+songInfo.title }
        );
    }else{
        nowPlayingEmbed
        .setTitle('Music :musical_note:')
	    .addFields(
            { name: 'Now Playing', value: 'Nothing is playing right now' }
        );
    }
    message.channel.send(nowPlayingEmbed);

}