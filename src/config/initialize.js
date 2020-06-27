module.exports = (client,servers) => {
    
    client.on('message',message =>{
        if(!servers[message.guild.id]){
            servers[message.guild.id]={
                prefix : '-',
                version : 1.0,
                queue : [],
                loop : false,
                shuffle : false
            }
        }
        var server = servers[message.guild.id];
    });
}