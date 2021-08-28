const audioElement = document.querySelector('audio')
const progressContainer = document.querySelector('#progress-container')

const albumCoverElement = document.querySelector('#cover')
const titleElement = document.querySelector('h4#song-title')
const musicInfoElement = document.querySelector('.music-info')
const playButton = document.querySelector('#play')
const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const playIcon = document.querySelector('#play-icon')
const progressBar = document.querySelector('.progress')

let songIndex = 2

const songTitles = ['hey', 'summer', 'ukulele']


const loadSong = (songTitle) => {
    audioElement.src = `music/${songTitle}.mp3`
    albumCoverElement.src = `images/${songTitle}.jpg`
    titleElement.innerHTML = `${songTitle}`
    pauseSong()


}

const playSong = () => {

    audioElement.play()
    musicInfoElement.classList.add("music-play")
    albumCoverElement.style.animation = 'rotation 2s infinite linear'
    playIcon.name = 'pause'
}

const pauseSong = () => {
    audioElement.pause()
    musicInfoElement.classList.remove("music-play")
    albumCoverElement.style.animation = 'none'
    playIcon.name = 'play'


}

const previousSong = () => {
    if (songIndex <= 0) {
        songIndex += 3
    }

    songIndex = (songIndex - 1) % 3

    loadSong(songTitles[songIndex])


}

const nextSong = () => {


    songIndex = (songIndex + 1) % 3
    loadSong(songTitles[songIndex])



}

// Execution

loadSong(songTitles[songIndex])


function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
    console.log('click')
}


// Event listeners

playButton.addEventListener('click', (e) => {
    if (audioElement.paused) {
        playSong()
    } else {
        pauseSong()
    }
})


prevButton.addEventListener('click', (e) => {

    previousSong()
})


nextButton.addEventListener('click', (e) => {
    nextSong()
})

audioElement.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration

    const completed = (currentTime && duration) ? (currentTime * 100 / duration) : 0

    progressBar.style.width = `${completed}%`

})

audioElement.addEventListener('ended', (e) => {
    nextSong()
    playSong()
})


// progressContainer.addEventListener('click', setProgress);