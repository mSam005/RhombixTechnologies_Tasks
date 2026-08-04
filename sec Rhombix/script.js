const TRACKS = [
    {
        id:1,
        title:"Amber Static",
        artist:"Nightbench",
        genre:"Lo-fi",
        duration:187,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id:2,
        title:"Corner Booth",
        artist:"Nightbench",
        genre:"Lo-fi",
        duration:203,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id:3,
        title:"Slow Dial Tone",
        artist:"Marigold Static",
        genre:"Lo-fi",
        duration:176,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    {
        id:4,
        title:"Dil Ka Mausam",
        artist:"Sana Kamal",
        genre:"Pakistani Pop",
        duration:221,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id:5,
        title:"Shehr-e-Yaadein",
        artist:"Junoon Wale",
        genre:"Pakistani Pop",
        duration:208,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id:6,
        title:"Roshni",
        artist:"Sana Kamal",
        genre:"Pakistani Pop",
        duration:195,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },

    {
        id:7,
        title:"Mast Qalandar Wapsi",
        artist:"Chishti Ensemble",
        genre:"Qawwali",
        duration:412,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        id:8,
        title:"Rang-e-Ishq",
        artist:"Chishti Ensemble",
        genre:"Qawwali",
        duration:389,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    {
        id:9,
        title:"Sarmastiyaan",
        artist:"Fanaa Qawwal Party",
        genre:"Qawwali",
        duration:456,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },

    {
        id:10,
        title:"Bewafa Sitam",
        artist:"Iqbal Rasa",
        genre:"Old Ghazals",
        duration:298,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    },

    {
        id:11,
        title:"Yaad-e-Guzashta",
        artist:"Farida Anjum",
        genre:"Old Ghazals",
        duration:276,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
    },

    {
        id:12,
        title:"Aakhri Khat",
        artist:"Iqbal Rasa",
        genre:"Old Ghazals",
        duration:264,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
    },

    {
        id:13,
        title:"Blue Room, 2AM",
        artist:"Low Fidelity Trio",
        genre:"Jazz Classic",
        duration:241,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3"
    },

    {
        id:14,
        title:"Smoked Reed",
        artist:"Coretta Voss",
        genre:"Jazz Classic",
        duration:198,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3"
    },

    {
        id:15,
        title:"Brushed Cymbal",
        artist:"Low Fidelity Trio",
        genre:"Jazz Classic",
        duration:254,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3"
    },

    {
        id:16,
        title:"Gravel Road",
        artist:"Ferra & the Hounds",
        genre:"Indie Rock",
        duration:224,
        src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
    }
];


const GENRES=[
    "All",
    "Pakistani Pop",
    "Qawwali",
    "Old Ghazals",
    "Jazz Classic",
    "Lo-fi",
    "Indie Rock"
];


const GENRE_COLOR={
    "Pakistani Pop":"#E8A33D",
    "Qawwali":"#D65D5D",
    "Old Ghazals":"#8FA8D6",
    "Jazz Classic":"#5FD9C6",
    "Lo-fi":"#B18CE8",
    "Indie Rock":"#E07856"
};


let currentId=1;
let playing=false;
let currentGenre="All";
let search="";
let liked=new Set();


const audio=document.getElementById("audio");

const genreList=document.getElementById("genreList");
const trackList=document.getElementById("trackList");

const playBtn=document.getElementById("playBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");

const searchInput=document.getElementById("searchInput");

const progress=document.getElementById("progress");
const volume=document.getElementById("volume");

const songTitle=document.getElementById("songTitle");
const songArtist=document.getElementById("songArtist");

const currentTime=document.getElementById("currentTime");
const duration=document.getElementById("duration");

const disc=document.getElementById("disc");

const muteBtn=document.getElementById("muteBtn");


audio.volume=0.7;


function formatTime(sec){

    if(!sec) return "0:00";

    let min=Math.floor(sec/60);
    let s=Math.floor(sec%60);

    return `${min}:${String(s).padStart(2,"0")}`;
}
function renderGenres(){

    genreList.innerHTML="";

    GENRES.forEach(g=>{

        let btn=document.createElement("button");

        btn.className="genre-btn";

        if(g===currentGenre){
            btn.classList.add("active");
        }

        btn.innerHTML=`
            <span style="
            display:inline-block;
            width:7px;
            height:7px;
            border-radius:50%;
            margin-right:10px;
            background:${g==="All" ? "#8B8296" : GENRE_COLOR[g]};
            ">
            </span>
            ${g}
        `;

        btn.onclick=()=>{

            currentGenre=g;

            renderGenres();
            renderTracks();

        };

        genreList.appendChild(btn);

    });

}



function getVisibleTracks(){

    return TRACKS.filter(track=>{

        let genreMatch =
            currentGenre==="All" ||
            track.genre===currentGenre;


        let text=
        (
            track.title+
            track.artist+
            track.genre
        )
        .toLowerCase();


        let searchMatch=
            text.includes(search.toLowerCase());


        return genreMatch && searchMatch;

    });

}



function renderTracks(){

    let tracks=getVisibleTracks();

    trackList.innerHTML="";


    let header=document.createElement("div");

    header.className="track-header";

    header.innerHTML=`
        <span>#</span>
        <span>Title</span>
        <span>Genre</span>
        <span>Time</span>
        <span></span>
    `;

    trackList.appendChild(header);



    tracks.forEach((track,index)=>{


        let row=document.createElement("div");

        row.className="track";


        if(track.id===currentId){

            row.classList.add("active");

        }


        let likedClass =
            liked.has(track.id)
            ? "active"
            : "";



        row.innerHTML=`

            <span>
            ${track.id===currentId && playing ? "▶" : index+1}
            </span>


            <div>

                <div class="track-title">
                    ${track.title}
                </div>

                <div class="track-artist">
                    ${track.artist}
                </div>

            </div>


            <div class="track-genre">
                ${track.genre}
            </div>


            <div class="track-time">
                ${formatTime(track.duration)}
            </div>


            <button class="like-btn ${likedClass}">
                ♥
            </button>

        `;



        row.onclick=()=>{

            if(track.id===currentId){

                togglePlay();

            }
            else{

                loadTrack(track.id);
                play();

            }

        };



        row.querySelector(".like-btn")
        .onclick=(e)=>{

            e.stopPropagation();


            if(liked.has(track.id)){
                liked.delete(track.id);
            }
            else{
                liked.add(track.id);
            }


            renderTracks();

        };



        trackList.appendChild(row);

    });


}



function loadTrack(id){

    currentId=id;


    let track =
    TRACKS.find(t=>t.id===id);


    if(!track) return;


    audio.src=track.src;


    songTitle.textContent=
    track.title;


    songArtist.textContent=
    track.artist;


    duration.textContent=
    formatTime(track.duration);



    progress.value=0;


    disc.style.background=
    `
    radial-gradient(
    circle at center,
    #12101A 0 6px,
    ${GENRE_COLOR[track.genre]} 7px,
    ${GENRE_COLOR[track.genre]} 8px,
    #1E1830 9px)
    `;


    renderTracks();

}



function play(){

    playing=true;

    audio.play()
    .catch(()=>{});


    playBtn.innerHTML=
    `<i data-lucide="pause"></i>`;


    disc.classList.add("spin");


    lucide.createIcons();


    renderTracks();

}



function pause(){

    playing=false;


    audio.pause();


    playBtn.innerHTML=
    `<i data-lucide="play"></i>`;


    disc.classList.remove("spin");


    lucide.createIcons();


    renderTracks();

}



function togglePlay(){

    if(playing){

        pause();

    }
    else{

        play();

    }

}



function nextTrack(){

    let tracks=getVisibleTracks();


    let index=
    tracks.findIndex(
        t=>t.id===currentId
    );


    index++;


    if(index>=tracks.length)
    index=0;



    loadTrack(tracks[index].id);

    play();

}



function previousTrack(){

    let tracks=getVisibleTracks();


    let index=
    tracks.findIndex(
        t=>t.id===currentId
    );


    index--;


    if(index<0)
    index=tracks.length-1;



    loadTrack(tracks[index].id);

    play();

}



playBtn.onclick=togglePlay;

nextBtn.onclick=nextTrack;

prevBtn.onclick=previousTrack;



searchInput.oninput=e=>{

    search=e.target.value;

    renderTracks();

};



audio.ontimeupdate=()=>{

    if(audio.duration){

        progress.value=
        (audio.currentTime/audio.duration)*100;


        currentTime.textContent=
        formatTime(audio.currentTime);

    }

};



audio.onended=()=>{

    nextTrack();

};



progress.oninput=()=>{

    if(audio.duration){

        audio.currentTime=
        (progress.value/100)
        *
        audio.duration;

    }

};



volume.oninput=()=>{

    audio.volume=
    volume.value;

};



muteBtn.onclick=()=>{


    if(audio.volume>0){

        audio.dataset.volume=
        audio.volume;

        audio.volume=0;

        volume.value=0;

    }
    else{

        let old=
        audio.dataset.volume || 0.7;

        audio.volume=old;

        volume.value=old;

    }

};
// Start player

document.getElementById("trackCount").textContent =
TRACKS.length + " tracks";


renderGenres();

loadTrack(currentId);

renderTracks();
