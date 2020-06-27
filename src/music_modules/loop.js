const Discord = require('discord.js');
const errorText = require('./errorText.js');

module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel || message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    server.loop = !server.loop;

    var text = 'FALSE  <:repeatred:726323421604085861>';
    if(server.loop){
        text = 'TRUE  <:repeatgreen:726323626877648946>';
    }

    const loopEmbed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
	.addFields(
        { name: 'Loop', value: text },
    );
    message.channel.send(loopEmbed);
}