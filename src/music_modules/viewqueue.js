const ytdl = require('ytdl-core');
const Discord = require('discord.js');

module.exports = async (message,pl) => {
    var queues = '';
    for(var i=0; i < pl.urlQueue.length;i++){
        var songInfo =  await ytdl.getInfo(pl.urlQueue[i]);
        queues = queues + '<:queue:726340852976189440> '+songInfo.title+'\n';
    }

    const playListEmbed = new Discord.MessageEmbed()
	.setColor('0x306EBF')
    .setTitle('My Playlist :musical_note:')
    .setDescription('Saved by <@'+pl.userID+'>')
	.addFields(
        { name: pl.name , value: queues },
    );
    message.channel.send(playListEmbed);
}