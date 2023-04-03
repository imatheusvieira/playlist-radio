const controls = document.querySelector('#controls');
const btPlay = document.querySelector('#play-control');
const modalLogin = document.querySelector("#modal-login");
const btAdm = document.querySelector("#adm");
const btCloseLogin = document.querySelector("#close-modal-login");
const btLogar = document.querySelector("#bt-logar");
const inputUser = document.querySelector("#user");
const inputPass = document.querySelector("#pass");
const btShuffle = document.querySelector("#random-icon")
const progressBar = document.querySelector("#progressbar");
const textCurrentDuration = document.querySelector("#current-duration");
const textTotalDuration = document.querySelector("#total-duration");

const musics = document.querySelectorAll(".musics");

let index = 0;
let currentMusic;
let isPlaying = false;

btAdm.addEventListener("click", (e)=>{
    modalLogin.style.display = "flex";
})

btCloseLogin.addEventListener("click", ()=>{
    modalLogin.style.display = "none";
})

function shuffle(array){
    let shuffleArray = [];
    let usedIndexes = [];

    let i = 0;
    while(i < array.length){
        let randomNumber = Math.floor(Math.random() * array.length);
        if(!usedIndexes.includes(randomNumber)){
           shuffleArray.push(array[randomNumber]);
           usedIndexes.push(randomNumber);
           i++;
        }
    }
    return shuffleArray;
}

let musicObj = {};
const musicArray = [];

musics.forEach(music => {
    musicObj.img = music.childNodes[1].childNodes[1].currentSrc;
    musicObj.title = music.childNodes[3].childNodes[0].data;
    musicObj.artist = music.childNodes[5].childNodes[0].data;
    musicObj.song = music.childNodes[7].childNodes[1];
    musicArray.push(musicObj)
    musicObj = {};
});

const shuffleAudios = shuffle(musicArray);

/*btPlay.addEventListener("click", ()=>{

    function updateDataMusic(){

    currentMusic = musicArray[index];

    document.querySelector("#currentImg").src = currentMusic.img;
    document.querySelector("#currentName").innerText = currentMusic.title;
    document.querySelector("#currentArtist").innerText = currentMusic.artist;
    document.querySelector("#volume").value = currentMusic.song.volume * 100;

    progressBar.max = currentMusic.song.duration;
    textTotalDuration.innerText = secondsToMinutes(currentMusic.song.duration);

    currentMusic.song.ontimeupdate = function () {
        textCurrentDuration.innerText = secondsToMinutes(currentMusic.song.currentTime);
        progressBar.valueAsNumber = currentMusic.song.currentTime;
    }
        console.log(currentMusic);
    }
    
    

    if( index == 0) {
        updateDataMusic();
    }

    if(!isPlaying) {
        btPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        currentMusic.song.play();
        isPlaying = true;
    } else {
        btPlay.classList.replace("bi-pause-fill", "bi-play-fill");
        currentMusic.song.pause();
        isPlaying = false;
    }
})

function secondsToMinutes(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}
*/



controls.addEventListener('click', function (event){
 

            //deixar aleatorio
         //let a = _.shuffle(audios);
         // currentMusic = a[index];
        /*audios.sort(()=>{
            return 0.5 - Math.random();
*/
    
    
  

    function updateDataMusic(){

        /*if(btShuffle.classList.contains("active")){
           currentMusic = audios[index.sort(()=>{
            return 05 - Math.random();
           })]
        }*/

        /*console.log(audios.sort(()=>{
            return 0.5 - Math.random()
        }));*/

        if(btShuffle.classList.contains("active")){
            console.log(shuffleAudios)
            currentMusic = shuffleAudios[index];
            document.querySelector("#currentImg").src = currentMusic.img;
            document.querySelector("#currentName").innerText = currentMusic.title;
            document.querySelector("#currentArtist").innerText = currentMusic.artist;
            document.querySelector("#volume").value = currentMusic.song.volume * 100;

            progressBar.max = currentMusic.song.duration;
            textTotalDuration.innerText = secondsToMinutes(currentMusic.song.duration);

            currentMusic.song.ontimeupdate = function () {
                textCurrentDuration.innerText = secondsToMinutes(currentMusic.song.currentTime);
                progressBar.valueAsNumber = currentMusic.song.currentTime;
            }
        } else {
            currentMusic = musicArray[index];
            document.querySelector("#currentImg").src = currentMusic.img;
            document.querySelector("#currentName").innerText = currentMusic.title;
            document.querySelector("#currentArtist").innerText = currentMusic.artist;
            document.querySelector("#volume").value = currentMusic.song.volume * 100;
    
            progressBar.max = currentMusic.song.duration;
            textTotalDuration.innerText = secondsToMinutes(currentMusic.song.duration);
    
            currentMusic.song.ontimeupdate = function () {
                textCurrentDuration.innerText = secondsToMinutes(currentMusic.song.currentTime);
                progressBar.valueAsNumber = currentMusic.song.currentTime;
            }
        }
    }
   


    if(event.target.id == "random-icon"){
       
        btShuffle.classList.toggle("active");
    };

    
    
    if(event.target.id == "play-control"){
        if( index == 0) {
            updateDataMusic();
        }

        if(!isPlaying) {
            btPlay.classList.replace("bi-play-fill", "bi-pause-fill");
            currentMusic.song.play();
            isPlaying = true;
        } else {
            btPlay.classList.replace("bi-pause-fill", "bi-play-fill");
            currentMusic.song.pause();
            isPlaying = false;
        }
        musicEnded();
    }

    if(event.target.id == "vol-icon"){
        currentMusic.song.muted = !currentMusic.song.muted;
        if(currentMusic.song.muted){
            event.target.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
        }else{
            event.target.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
        }

        musicEnded();
    }

    if(event.target.id == "volume"){
        currentMusic.song.volume = event.target.valueAsNumber / 100;
        musicEnded();
    }

    if(event.target.id == "progressbar"){
        currentMusic.song.currentTime = event.target.valueAsNumber;
        musicEnded();
    }

    if(event.target.id == "next-control"){
        index++;

        if( index == musicArray.length){
            index = 0;
        }

        currentMusic.song.pause();
        updateDataMusic();
        currentMusic.song.play();
        btPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        musicEnded();
    }

    if(event.target.id == "prev-control"){
        index--;

        if( index == -1){
            index = musicArray.length - 1;
        }

        currentMusic.song.pause();
        updateDataMusic();
        currentMusic.song.play();
        btPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        musicEnded();
    }

    function musicEnded(){
        currentMusic.song.addEventListener("ended", function(){
            index++

            if( index == song.length){
                index = 0;
            }

            currentMusic.song.pause();
            updateDataMusic();
            currentMusic.song.play();
            btPlay.classList.replace("bi-play-fill", "bi-pause-fill");
        })
    }

});

function secondsToMinutes(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}

