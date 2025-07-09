// audioplayer implemnetation, see /src/_includes/layouts/core.html
// for usage and the appropriate template variables.

document.addEventListener('DOMContentLoaded', function() {                  
      
    const audio_player = document.querySelector("#audio-player"); // div containing audio player elms        
    const audio_player_title = document.querySelector("#audio-player-title"); // title of the audio player
    const audio_player_state = document.querySelector("#audio-player-state"); // play or pause state button
    const audio_player_vol = document.querySelector("#audio-player-vol"); // volume control   
    const track = audio_player.dataset.track; // // note! data-* supports kebab case in html, and camel for JS (it sucks, I know...)
    
    const music_element = new Audio(""); // hidden programtically controlled music elm.
    music_element.src = track;  
    console.log('audio-player: loaded track', track);

    // handle the start / stopping of page music
    function change_song_state(){     
        // if paused start playing music
        if (music_element.paused){
            audio_player_state.src = "/assets/images/pause.png";
            audio_player_title.style.animation = "glow 3s linear infinite";
            music_element.play();    
            console.log('audio-player: resuming play');                                   
        }
        // if the audio is playing, pause it                                
        else if ( ! music_element.paused){                                  
            audio_player_state.src = "/assets/images/play.png";
            audio_player_title.style.animation = null;                      
            music_element.pause();                   
            console.log('audio-player: pausing play');                       
        }   
    }
    // handle for inputs
    music_element.addEventListener("ended", () => change_song_state());
    audio_player_state.addEventListener('click',() => change_song_state());
    audio_player_vol.addEventListener("input", () => {music_element.volume = parseFloat(audio_player_vol.value);});
});
