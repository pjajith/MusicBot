const ytdl =require('ytdl-core');
const dotenv =require('dotenv');
const scrapeYt = require('scrape-yt');
dotenv.config();
const playSong = require('./playsong.js');
const Discord = require('discord.js');
const errorText = require('./errorText.js');

module.exports = async (args,message,servers) => {

    //Link
    if(!args[1]){
        return errorText(message,'No Link');
    }

    //Member Connection
    if(!message.member.voice.channel){
        return errorText(message,'Not connected to voice channel');
    }

    var server = servers[message.guild.id];

    if(ytdl.validateURL(args[1])){
        server.queue.push(args[1]);
    }else{
        let videos = await scrapeYt.search(message.content.substring(6),{limit:1 , type:"video"});
        server.queue.push('https://www.youtube.com/watch?v='+videos[0].id);
    }

    if(server.queue.length>1){
        var songInfo =  await ytdl.getInfo(server.queue[server.queue.length-1]);

        const addToQueue = new Discord.MessageEmbed()
        .setTitle('Music :musical_note:')
	    .addFields(
            { name: 'Queue Update', value: '<:queue:726340852976189440> Added '+songInfo.title + ' to queue' }
        );

        message.channel.send(addToQueue);
    }

    if(!message.guild.me.voice.channel || (message.guild.me.voice.channel&&!server.dispatcher)){
        message.member.voice.channel.join().then((connection) =>{
            playSong(connection,message,servers);
        });
    }
    else if(message.guild.me.voice.channel && message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        return errorText(message,'Not on same voice channel');
    } 
}
