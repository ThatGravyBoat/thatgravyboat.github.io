
const fetchSongData = () => {
    fetch("https://spotify.thatgravyboat.workers.dev/")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const cover = htmlDoc.querySelector(".cover");
            const artist = htmlDoc.querySelector(".artist");
            const song = htmlDoc.querySelector(".song");

            document.getElementById("song-title").innerText = song.innerText;
            document.getElementById("song-artist").innerText = artist.innerText + " - " + song.innerText;
            document.getElementById("song-image").src = cover.src;
        })
        .catch(console.error);
}



document.body.addEventListener("click", (event) => {
    let icon = document.getElementById("play-icon");
    if (event.target.closest("#play-icon") && !icon.attributes["data-open"]) {
        icon.setAttribute("data-open", undefined);
    } else if (!event.target.closest("#song-container")) {
        icon.removeAttribute("data-open");
    }
});

fetchSongData();

setInterval(fetchSongData, 3 * 60 * 1000)

