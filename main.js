// following tutorial from https://www.youtube.com/watch?v=j_sD9udZnCk, https://www.youtube.com/watch?v=nTGtiCC3iQM, and https://gabrieltanner.org/blog/dicord-music-bot

const Discord = require('discord.js');
const musicBot = new Discord.Client();
const prefix = '%';
const yt = require("ytdl-core");
const yts = require('yt-search');
const list = new Map();

musicBot.once('ready', () => {
    console.log('CioherMusic is online.')
});

musicBot.on('message', mess => {
    if (!mess.content.startsWith(prefix) || mess.author.bot) return;

    var arg = mess.content.slice(prefix.length).split(" ");
    const listServer = list.get(mess.guild.id);

    switch (arg[0]) {
        case 'hello':
            mess.channel.send('Hi!');
            break;
        
        case 'beulping':
            mess.channel.send('https://www.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A');
            break;


        case 'play':
            mess.channel.send('Loading...');
            //return mess.channel.send(mess.guild.valueOf);
            playMusic(mess, mess.guild.id, listServer);
            break;

        default:
            mess.channel.send('Please add yourself into a voice channel before putting a command!');
    }

});

async function playMusic(mess, guild, listServer) {
    const arg = mess.content.split(" ");
    const vc = mess.member.voice.channel;

    if (!vc) {
        return mess.channel.send("Please add yourself into a voice channel!");
    }

    
    let info;
    let song;
    
    if (yt.validateURL(arg[1])) {
        info = await yt.getInfo(arg[1]);

        //using logic from: https://gabrieltanner.org/blog/dicord-music-bot
        song = {
            songTitle: info.videoDetails.title,
            url: info.videoDetails.video_url,
            connection: null
        };

        if (!listServer) {
            
            const listData = {
              textChannel: mess.channel,
              voiceChannel: vc,
              connection: null,
              songs: [],
              playing: true
            };

            list.set(guild, listData);
            listData.songs.push(song);

            try {
                var conn = await vc.join();
                list.connection = conn;
                //return mess.channel.send('From playMusic function ' + song.songTitle);
                play(guild, listData.songs[0]);
                // return mess.channel.send("Finished playing " + song.songTitle + ". Leaving the voice channel!");
            } catch (error) {
                console.log(error);
                list.delete(guild);
                return mess.channel.send('There was an error in playing the song. Try again!');
            }

        }
        else {
            listServer.songs.push(song);
            return mess.channel.send(song.songTitle + ' has been added to the queue!');
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
    const server = list.get(g);

    // using logic from both: https://www.youtube.com/watch?v=j_sD9udZnCk and //using logic from: https://gabrieltanner.org/blog/dicord-music-bot
    server.disptacher = server.connection.play(yt(s.url, {filter: "audioonly"}))
    .on("end", () => {
        server.songs.shift();
        play(guild, server.songs[0]);
    })
    .on("error", error => console.error(error));

}

musicBot.login('<token>');