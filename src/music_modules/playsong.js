const ytdl = require('ytdl-core');
const shuffle = require('./shuffle.js');
const Discord = require('discord.js');
const qempty = require('./queueempty.js');

module.exports = playSong = (connection,message,servers) => {


    var server = servers[message.guild.id];
    if(server.queue[0]){
        server.dispatcher = connection.play(ytdl(server.queue[0],{filter : "audioonly"}));
    }else{
        qempty(message);
        connection.disconnect();
    }
    if(server.dispatcher){
        server.dispatcher.on('start', async ()=>{
            var songInfo =  await ytdl.getInfo(server.queue[0]);

            const nowPlayingEmbed = new Discord.MessageEmbed()
            .setTitle('Music :musical_note:')
	        .addFields(
            { name: 'Now Playing', value: '<:play:726333947763490866>  '+songInfo.title }
            );

            message.channel.send(nowPlayingEmbed);
        })
        server.dispatcher.on('finish', ()=> {
            if(server.loop){
                server.queue.push(server.queue[0]);
            }
            server.queue.shift();
            if(server.shuffle){
                shuffle(message,servers);
            }
            if(server.queue[0]){
                playSong(connection,message,servers);
            }else{
                qempty(message);
                connection.disconnect();
            }
        })
    }
}