const shuffle = require('./shuffle.js');
const errorText = require('./errorText.js');
const qempty = require('./queueempty.js');
module.exports = (message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }
    server.dispatcher.destroy();
    if(server.loop){
        server.queue.push(server.queue[0]);
    }
    server.queue.shift();
    if(server.shuffle){
        shuffle(message,servers);
    }
    message.member.voice.channel.join().then((connection) =>{
        if(server.queue[0]){
            playSong(connection,message,servers);
        }else{
            qempty(message);
            delete server.dispatcher;
            connection.disconnect();
        }
    });
}