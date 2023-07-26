
const fetchSongData = () => {
    const URL = "https%3A%2F%2Fspotify-github-profile.vercel.app%2Fapi%2Fview.svg%5C%3Fuid%3D0o7l6ki4nbj69g9vvf0zojdi5";
    const url = 'https://corsproxy.io/?' + URL;
    fetch(url)
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

