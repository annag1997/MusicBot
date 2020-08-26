// following tutorial from https://www.youtube.com/watch?v=j_sD9udZnCk, https://www.youtube.com/watch?v=nTGtiCC3iQM, and https://gabrieltanner.org/blog/dicord-music-bot

const Discord = require('discord.js');
const musicBot = new Discord.Client();
const prefix = '%';
const yt = require("ytdl-core");
const yts = require('yt-search');

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
    const g = mess.guild;

    if (!vc) {
        return mess.channel.send("Please add yourself into a voice channel!");
    }

    
    let info;
    let song;
    
    if (yt.validateURL(arg[1])) {
        info = await yt.getInfo(arg[1]);

        song = {
            songTitle: info.videoDetails.title,
            url: info.videoDetails.video_url,
            connection: null
        };

        try {
            var conn = await vc.join();
            song.connection = conn;
            play(g, song);
            return mess.channel.send("Finished playing " + song.songTitle + ". Leaving the voice channel!");
        } catch (error) {
            console.log(error);
            return message.channel.send('There was an error in playing the song. Try again!');
        }

        
    } else {

        //testing out code from https://www.npmjs.com/package/yt-search
        yts(arg[1], function (error, r) {
            if (error) throw error
           
            // return mess.channel.send(arg[1])
            const videos = r.videos
            return mess.channel.send(videos[1]);
            // for(i=0;i<arg.length-1;i++) {
            //     return mess.channel.send(videos[i])
            // }
            // videos.forEach( function ( v ) {
            //   const views = String( v.views ).padStart( 10, ' ' )
            //   return mess.channel.send( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.author.name }` )
            // } )
            
          } )
    }
}

function play(g, s) {
    const server = g.id;
    // if (!s) {
    //     return message.channel.send('There was an error in playing the song. Try again!');
    // }

    const dispatcher = server.connection.play(g, s);
    server.voiceChannel.leave();
}

musicBot.login('<token>');