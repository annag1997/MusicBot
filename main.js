// following tutorial from https://www.youtube.com/watch?v=j_sD9udZnCk and https://www.youtube.com/watch?v=nTGtiCC3iQM 

const Discord = require('discord.js');
const musicBot = new Discord.Client();
const prefix = '%';

musicBot.once('ready', () => {
    console.log('CioherMusic is online.')
});

musicBot.on('message', mess => {
    if (!mess.content.startsWith(prefix) || mess.author.bot) return;

    const arg = mess.content.slice(prefix.length).split(/ + /);
    const comm = arg.shift().toLowerCase();

        if (comm === 'play') {
            mess.channel.send('Playing...');
        }

        else if (comm === 'beulping') {
            mess.channel.send('https://www.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A')
        }
});


musicBot.login('<token>');