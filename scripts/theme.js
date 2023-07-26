function switchTheme() {
    if (localStorage.getItem("colormode") === "light") {
        document.getElementsByTagName( 'html' )[0].classList.add("lightmode");
    } else {
        document.getElementsByTagName( 'html' )[0].classList.remove("lightmode");
    }
}

if (!localStorage.getItem("colormode")) {
    localStorage.setItem("colormode", "dark");
}
switchTheme();

window.addEventListener('load', () => {
    document.getElementById("theme-toggle").addEventListener('click', () => {
        localStorage.setItem("colormode", localStorage.getItem("colormode") === "light" ? "dark" : "light");
        switchTheme();
    });
})