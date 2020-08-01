// following tutorial from https://www.youtube.com/watch?v=j_sD9udZnCk and https://www.youtube.com/watch?v=nTGtiCC3iQM 

const Discord = require('discord.js');
const musicBot = new Discord.Client();
const prefix = '%';

musicBot.once('ready', () => {
    console.log('CioherMusic is online.')
});

musicBot.on('message', mess => {
    if (!mess.content.startsWith(prefix) || mess.author.bot) return;

    var arg = mess.content.slice(prefix.length).split(" ");

    switch (args[0]) {
        case 'hello':
            mess.channel.send('Hi!');
            break;
        
        case 'beulping':
            mess.channel.send('https://www.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A');
            break;

        default:
            mess.channel.send('Type something');
    }

});


musicBot.login('<token token token>');