const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const emoji = require('../config/emoji.js');

module.exports = async (message,pl) => {
    var queues = '';
    for(var i=0; i < pl.urlQueue.length;i++){
        var songInfo =  await ytdl.getInfo(pl.urlQueue[i]);
        queues = queues + emoji.queue+songInfo.title+'\n';
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