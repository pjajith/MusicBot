//config
const initialize = require('./initialize.js');

//commands
const music = require('../commands/music.js')


module.exports = (client,servers) => {

    initialize(client,servers);
    music(client,servers);

}