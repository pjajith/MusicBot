const discord = require('discord.js');
const client = new discord.Client();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//environment variables
dotenv.config();

//servers
var servers = {};

mongoose.connect(process.env.database,{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true},
    () => console.log('DB Connected'));

const fileimports = require('./src/config/fileimports.js');

client.on('ready' ,() => {
    console.log('Ready');
})


fileimports(client,servers);

client.login(process.env.token);
