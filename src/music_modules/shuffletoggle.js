const errorText = require('./errorText.js');
const Discord = require('discord.js');
const emoji = require('../config/emoji.js');
module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    server.shuffle = !server.shuffle;

    var text = 'FALSE  '+emoji.shuf_r;
    if(server.shuffle){
        text = 'TRUE  '+emoji.shuf_g;
    }

    const shuffleEmbed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
	.addFields(
        { name: 'Shuffle', value: text },
    );
    message.channel.send(shuffleEmbed);
}