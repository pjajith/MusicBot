const errorText = require('./errorText.js');
const Discord = require('discord.js');
module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    server.shuffle = !server.shuffle;

    var text = 'FALSE  <:shufflered:726325190191087660>';
    if(server.shuffle){
        text = 'TRUE  <:shufflegreen:726325190593609789>';
    }

    const shuffleEmbed = new Discord.MessageEmbed()
    .setTitle('Music :musical_note:')
	.addFields(
        { name: 'Shuffle', value: text },
    );
    message.channel.send(shuffleEmbed);
}