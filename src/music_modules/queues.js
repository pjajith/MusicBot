const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const errorText = require('./errorText.js');
const qempty = require('./queueempty.js');
const emoji = require('../config/emoji.js');

module.exports = async (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }

    var queues= '';
    var embedColour = '0x30BF98';
    var repeatEmoji = emoji.rep_r;
    var shuffleEmoji = emoji.shuf_r;
    var volumeEmoji = emoji.volG;

    if(server.queue.length){
        for(var i = 0; i< server.queue.length;i++){
            var songInfo =  await ytdl.getInfo(server.queue[i]);
            queues = queues + emoji.queue+songInfo.title+'\n';
        }
    }else{
        return qempty(message);
    }
    if(server.dispatcher.paused){
        embedColour = '0xEFFE00';
    }
    if(server.loop){
        repeatEmoji = emoji.rep_g;
    }
    if(server.shuffle){
        shuffleEmoji = emoji.shuf_g;
    }
    if(server.dispatcher.volume<=0.25){
        volumeEmoji = emoji.volR;
    }else if(server.dispatcher.volume<=0.50){
        volumeEmoji = emoji.volO;
    }else if(server.dispatcher.volume<=0.75){
        volumeEmoji = emoji.volY;
    }
    var settings = repeatEmoji +'\t'+shuffleEmoji+'\t'+volumeEmoji+server.dispatcher.volume*100 ;
    const queueEmbed = new Discord.MessageEmbed()
	.setColor(embedColour)
    .setTitle('Music :musical_note:')
	.addFields(
        { name: 'In Queue', value: queues },
        { name : 'Player settings' , value : settings}
    );
    message.channel.send(queueEmbed);
}