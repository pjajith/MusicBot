const Discord = require('discord.js');
const errorText = require('./errorText.js');
const emoji = require('../config/emoji.js');

module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel || message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    server.loop = !server.loop;

    var text = 'FALSE  '+emoji.rep_r;
    if(server.loop){
        text = 'TRUE  '+emoji.rep_g;
    }

    const loopEmbed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
	.addFields(
        { name: 'Loop', value: text },
    );
    message.channel.send(loopEmbed);
}