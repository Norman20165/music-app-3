let container = document.querySelector('.album');

let search = new URLSearchParams(window.location.search);
let id = search.get('id')

let album = albums[id - 1];

if (!album) {
    container.innerHTML = 'Error 404. You will be returned to the main page in 5 seconds';
    setTimeout(() => {
        window.location.pathname = 'index.html';
    }, 5000);
} else {
    container.innerHTML = `
<div class="card mb-3">
    <div class="row">
        <div class="col-4">
            <img src="${album['img']}" alt="" class="img-fluid rounded-start">
        </div>
        <div class="col-8">
            <div class="card-body">
                <h5 class="card-title">${album['title']}</h5>
                <p class="card-text">${album['description']}</p>
                <p class="card-text"><small class="text-muted">Сборник был выпущен в ${album['year']} году</small></p>
            </div>
        </div>
    </div>
</div>
`;

let playlist = document.querySelector('.playlist');

let tracks = album['tracks'];

for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    playlist.innerHTML += `
    <li class="track list-group-item d-flex align-items-center">
    <img src="${album['img']}" alt="" class="me-3 img-pause" height="30px">
    <img src="assets/5742764_2979562.jpg" alt="" class="me-3 img-play" height="30px">
        <div>
            <div>${track['title']}</div>
            <div class="text-secondary">${track['author']}</div>
        </div>
        <div class="progress" style='width: 60%; margin: auto;'>
            <div class="progress-bar" role='progressbar' style="width: 0%;"></div>
        </div>
        <div class="time ms-auto">${track['time']}</div>
        <audio class='audio' src='${track['src']}'></audio>
    </li>
    `;
}
}

function setupAudio() {
    let trackNodes = document.querySelectorAll('.track');
    for (let i = 0; i < trackNodes.length; i++) {
        let node = trackNodes[i];
        let timeNode = node.querySelector('.time')
        let imgPause = node.querySelector('.img-pause');
        let imgPlay = node.querySelector('.img-play');
        let progressBar = document.querySelector('.progress-bar');
        imgPlay.classList.add('d-none')
        let audio = node.querySelector('.audio');
        let isPlaying = false;
        node.addEventListener('click', function() {
        if (isPlaying) {
            isPlaying = false;
            audio.pause();
            imgPlay.classList.add('d-none');
            imgPause.classList.remove('d-none');
        } else {
            isPlaying = true;
            audio.play();
            imgPlay.classList.remove('d-none');
            imgPause.classList.add('d-none');
            updateProgress();
        }
        });
        function updateProgress() {
            let time = getTime(audio.currentTime);
            if (timeNode.innerHTML != time) {
                timeNode.innerHTML = time;
                progressBar.style.width = audio.currentTime * 100 / audio.duration + '%';
            }
            if (isPlaying) {
                  requestAnimationFrame(updateProgress);
            } 
        }
    }
};

setupAudio();

function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);
    
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
};