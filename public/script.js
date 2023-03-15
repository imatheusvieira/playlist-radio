const controls = document.querySelector('#controls');
const btPlay = document.querySelector('#play-control');

let index = 0;
let currentMusic;
let isPlaying = false;

controls.addEventListener('click', function (event){
    const audios = [];
    let music = {};

    if(event.target.id != "controls"){
     const element = event.composedPath();
    const musics = element[3].childNodes[2].childNodes[3].childNodes[5].childNodes[1].childNodes[3].childNodes;

    console.log(element);

    musics.forEach((item) => {
        if(item.nodeName != '#text'){
            music.image = item.childNodes[1].childNodes[1].currentSrc;
            music.artist = item.childNodes[5].childNodes[0].data;
            music.music = item.childNodes[3].childNodes[0].data;
            music.audio = item.childNodes[7].childNodes[1];
            audios.push(music);
            music = {};
        }
    });
    };

    function updateDataMusic(){
        //deixar aleatorio
        currentMusic = audios[index];
        document.querySelector("#currentImg").src = currentMusic.image;
        document.querySelector("#currentName").innerText = currentMusic.music;
        document.querySelector("#currentArtist").innerText = currentMusic.artist;
        document.querySelector("#volume").value = currentMusic.audio.volume * 100;

        const progressBar = document.querySelector("#progressbar");
        const textCurrentDuration = document.querySelector("#current-duration");
        const textTotalDuration = document.querySelector("#total-duration");

        progressBar.max = currentMusic.audio.duration;
        textTotalDuration.innerText = secondsToMinutes(currentMusic.audio.duration);

        currentMusic.audio.ontimeupdate = function () {
            textCurrentDuration.innerText = secondsToMinutes(currentMusic.audio.currentTime);
            progressBar.valueAsNumber = currentMusic.audio.currentTime;
        }

    
    }
    
    if(event.target.id == "play-control"){
        if( index == 0) {
            updateDataMusic();
        }

        if(!isPlaying) {
            btPlay.classList.replace("bi-play-fill", "bi-pause-fill");
            currentMusic.audio.play();
            isPlaying = true;
        } else {
            btPlay.classList.replace("bi-pause-fill", "bi-play-fill");
            currentMusic.audio.pause();
            isPlaying = false;
        }
    }

    if(event.target.id == "vol-icon"){
        currentMusic.audio.muted = !currentMusic.audio.muted;
        if(currentMusic.audio.muted){
            event.target.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
        }else{
            event.target.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
        }
    }

    if(event.target.id == "volume"){
        currentMusic.audio.volume = event.target.valueAsNumber / 100;
    }

    if(event.target.id == "progressbar"){
        currentMusic.audio.currentTime = event.target.valueAsNumber;
    }


});

function secondsToMinutes(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}