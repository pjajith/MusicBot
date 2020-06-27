
const errorText = require('./errorText.js');
var playlist = require('./playlistschema.js');
const viewQueue = require('./viewqueue.js');
const viewPlaylists = require('./viewplaylists.js');
const successText = require('./successText.js');

module.exports = (args,message,servers) => {

    var server = servers[message.guild.id];

    if(!server.dispatcher || !message.guild.me.voice.channel || !message.member.voice.channel|| message.member.voice.channel.id!=message.guild.me.voice.channel.id){
        errorText(message,'Im not Playing for you');
        return;
    }

    if(!args[1]){
        return errorText(message,'Use playlist <save/view/delete/name>');
    }else if(args[1]==='save'){

        if(!args[2]){
            return errorText('Mention playlist name');
        }else if(!server.queue[0]){
            errorText(message,'Queue is empty');
        }else{
            var newPlayList = new playlist({
                name : args[2],
                urlQueue: server.queue,
                userID: message.member.id
            });
            newPlayList.save((err) => {
                if(err){
                    if(err.name === 'MongoError' && err.code === 11000){
                        errorText(message,'Playlist with this name already exists');
                    }else{
                        errorText(message,'Unable to save playlist');
                        console.log(err);
                    }
                }else{
                    successText(message,'Saved playlist : '+args[2]);
                }
            })
        }

    }else if(args[1]==='delete'){
        if(!args[2]){
            return errorText(message,'Provide the playlist name to delete');
        }else{
            playlist.findOneAndDelete({name : args[2]},(err,pl)=>{
                if(err || !pl){
                    return errorText(message,'Couldn\'t find a playlist with that name');
                }else{
                    successText(message,'Deleted playlist : '+args[2]);
                }
            })
        }
    }else if(args[1]==='view'){
        if(!args[2]){
            playlist.find({},(err,pl) =>{
                if(err || !pl){
                    return errorText(message,'Couldn\'t retrieve playlists or no available playlists');
                }else{
                    viewPlaylists(message,pl);
                }
            })
        }else{
            playlist.findOne({name : args[2]}, (err,pl)=>{
                if(err || !pl){
                    return errorText(message,'Cannot find playlist with name '+args[2]);
                }else{
                    return viewQueue(message,pl);
                }
            })
        }
    }else{
        playlist.findOne({name : args[1]},(err,pl) => {
            if(err || !pl){
                return errorText(message,'Cannot find playlist with name '+args[1]);
            }else{
                server.queue = server.queue.concat(pl.urlQueue);
                return successText(message,'Playlist '+pl.name+' by <@'+pl.userID+'> has been added to current queue');
            }
        })
    }
}