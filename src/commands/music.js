const play = require('../music_modules/play.js');
const skip = require('../music_modules/skip.js');
const stop = require('../music_modules/stop.js');
const nowPlaying = require('../music_modules/nowPlaying.js');
const pause = require('../music_modules/pause.js');
const resume = require('../music_modules/resume.js');
const volume = require('../music_modules/volume.js');
const loop = require('../music_modules/loop.js');
const queues = require('../music_modules/queues.js');
const shuffleToggle = require('../music_modules/shuffletoggle.js');
const playList= require('../music_modules/playlist');

module.exports = (client,servers) => {

    client.on('message', message => {

        var server = servers[message.guild.id];

        if(!message.content.startsWith(server.prefix)){
            return;
        }
        
        let args = message.content.substring(server.prefix.length).split(' ');

        switch(args[0].toLowerCase()){
            case 'play':
                play(args,message,servers);
                break;
            case 'nowplaying':
            case 'np':
                nowPlaying(message,servers);
                break;
            case 'pause':
                pause(message,servers);
                break;
            case 'playlist':
            case 'pl':
                playList(args,message,servers);
                break;
            case 'queue':
                queues(message,servers);
                break;
            case 'resume':
                resume(message,servers);
                break;
            case 'stop':
            case 'disconnect':
            case 'dc':
                stop(message,servers);
                break;
            case 'volume':
            case 'vol':
                volume(args,message,servers);
                break;
            case 'loop':
                loop(message,servers);
                break;
            case 'skip':
                skip(message,servers);
                break;
            case 'shuffle':
                shuffleToggle(message,servers);
                break;
        }
    });

}