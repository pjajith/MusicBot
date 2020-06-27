const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const errorText = require('./errorText.js');
const qempty = require('./queueempty.js');

module.exports = async (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }

    var queues= '';
    var embedColour = '0x30BF98';
    var repeatEmoji = '<:repeatred:726323421604085861>';
    var shuffleEmoji = '<:shufflered:726325190191087660>';
    var volumeEmoji = '<:volG:726334847773048883>';

    if(server.queue.length){
        for(var i = 0; i< server.queue.length;i++){
            var songInfo =  await ytdl.getInfo(server.queue[i]);
            queues = queues + '<:queue:726340852976189440> '+songInfo.title+'\n';
        }
    }else{
        return qempty(message);
    }
    if(server.dispatcher.paused){
        embedColour = '0xEFFE00';
    }
    if(server.loop){
        repeatEmoji = '<:repeatgreen:726323626877648946>';
    }
    if(server.shuffle){
        shuffleEmoji = '<:shufflegreen:726325190593609789>';
    }
    if(server.dispatcher.volume<=0.25){
        volumeEmoji = '<:volR:726335447361519686>';
    }else if(server.dispatcher.volume<=0.50){
        volumeEmoji = '<:volO:726335156474085466>';
    }else if(server.dispatcher.volume<=0.75){
        volumeEmoji = '<:volY:726334847496355896>';
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