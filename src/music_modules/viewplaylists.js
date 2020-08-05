const Discord = require('discord.js');
const emoji = require('../config/emoji.js');

module.exports = async (message,pl) => {
    var playlists = '';
    if(!pl.length){
        playlists = 'No Playlist have been saved';
    }

    for(var i=0; i < pl.length;i++){
        playlists = playlists +emoji.queue+ pl[i].name +' saved by <@'+pl[i].userID+'>'+'\n';
    }

    const playListEmbed = new Discord.MessageEmbed()
	.setColor('0x306EBF')
    .setTitle('Music :musical_note:')
	.addFields(
        { name: 'My Playlists' , value: playlists },
    );
    message.channel.send(playListEmbed);
}