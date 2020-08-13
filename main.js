// following tutorial from https://www.youtube.com/watch?v=j_sD9udZnCk, https://www.youtube.com/watch?v=nTGtiCC3iQM, and https://gabrieltanner.org/blog/dicord-music-bot

const Discord = require('discord.js');
const musicBot = new Discord.Client();
const prefix = '%';
const yt = require("ytdl-core");
const yts = require("yt-search");

musicBot.once('ready', () => {
    console.log('CioherMusic is online.')
});

musicBot.on('message', mess => {
    if (!mess.content.startsWith(prefix) || mess.author.bot) return;

    var arg = mess.content.slice(prefix.length).split(" ");

    switch (arg[0]) {
        case 'hello':
            mess.channel.send('Hi!');
            break;
        
        case 'beulping':
            mess.channel.send('https://www.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A');
            break;


        case 'play':
            mess.channel.send('Loading...');
            
            playMusic(mess);
            break;

        default:
            mess.channel.send('Please add yourself into a voice channel before putting a command!');
    }

});

async function playMusic(mess) {
    const arg = mess.content.split(" ");
    const vc = mess.member.voice.channel;

    if (!vc) {
        return mess.channel.send("Please add yourself into a voice channel!");
    }

    
    let info;
    let song;
    
    info = await yt.getInfo(arg[1]);

        song = {
        songTitle: info.videoDetails.title,
        url: info.videoDetails.video_url,
        connection: null
    };

    return mess.channel.send("Finished playing " + song.songTitle + ". Validated URL");

    // try {
    //     var connect = await vc.join();
    //     song.connection = connect;
    //     //yt(song.songTitle);
    //     return mess.channel.send("Finished playing " + song.songTitle);

    // } catch (error) {
    //     console.log(error);
    //     return mess.channel.send("Error: " + error);
    // }
}


musicBot.login('<token>');