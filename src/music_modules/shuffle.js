const errorText = require('./errorText.js');
const emoji = require('../config/emoji.js');
module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    
    for (let i = server.queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [server.queue[i], server.queue[j]] = [server.queue[j], server.queue[i]];
    }

}