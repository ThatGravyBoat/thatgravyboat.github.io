const HEADER = `<div class="fake-header">
    <div class="fake-window-controls" style="background-color: #c53434"></div>
    <div class="fake-window-controls" style="background-color: #c97d30"></div>
    <div class="fake-window-controls" style="background-color: #52ad3d"></div>
</div>`

const PROJECTS = [
    {
        title: "Resourceful Config",
        description: [
            `Resourceful Config is a configuration system created for Minecraft 
            that pairs both an in-game and out-of-game configuration manager allowing 
            for easy switching and usage for anyone.`,
            `This project was quite extensive using various technologies and multiple programming languages.`,
            `For the web portion of the config system it used 
                <a href="https://expressjs.com/" target="_blank">Express.JS</a>, 
                <a href="https://www.mysql.com/" target="_blank">MySQL</a>, 
                JWT, 
                and 
                <a href="https://nodejs.org/" target="_blank">Node.JS</a>. 
                Using these technologies, I built a server that handles authentication requests via Microsoft OAuth login. 
                It converts the retrieved information into a JWT for user-server connections. 
                The servers use these JWTs for user verification and token revocation.
            `,
            `For the server side it used javas http server that would take requests using the JWT and return information about
            the servers configs and would also allow for setting said configs.`
        ],
        links: {
            "Website ->": "https://config.teamresourceful.com/about",
            "Project GitHub ->": "https://github.com/Team-Resourceful/Resourceful-Config",
            "Website GitHub ->": "https://github.com/Team-Resourceful/Resourceful-Config-Web",
        }
    },
    {
        title: "Beat Score",
        description: [
            "Beat Score is a Twitch extension that allowed users display and show off their statistics for Beat Saber.",
            `The extension used 
            <a href="https://jquery.com/" target="_blank">JQuery</a> 
            and the 
            <a href="https://dev.twitch.tv/docs/extensions/reference/" target="_blank">Twitch extension API</a> 
            to retrieve information from 
            <a href="https://scoresaber.com" target="_blank">ScoreSaber</a>
            and to display the relative information to users visiting the streamers page.`,
            `Along showing information to visitors it also allowed for the streamer to configure the extension in various ways, 
            such as the streamer could choose which account the information would be retrieved from and if they wanted to 
            change specific values from being displayed.
            `
        ],
        links: {
            "Extension Page ->": "https://dashboard.twitch.tv/extensions/p56340ihyeva092fy8cxikjjzo67n0-0.0.7"
        }
    },
    {
        title: "Resourceful Lib",
        description: [
            `Resourceful Lib is a collection of utilities used by myself and others to make the 
            ease of cross platform modifications for Minecraft easier.`,
            `It contains utilities such as a custom data format called YABN (YetAnotherBinaryNotation) which allows
            for the transfer of arbitrary named data. Also with YABN it also contains ByteCodecs which
            are a ByteBuf inspired version of 
            Mojang Studios <a href="https://github.com/Mojang/DataFixerUpper" target="_blank">DataFixerUpper</a> Codecs
            these allow for fast creation of objects that will be transferred across networks, it is loved by developers due to its simplicity.
            `,
            `Along with the fully new custom utilities it also makes an abstraction layer for various platform specific code such as registration or networking protocols.`,
            `This library is used in a multitude of projects which has allowed it to amass over 15 million downloads.`
        ],
        links: {
            "CurseForge ->": "https://www.curseforge.com/minecraft/mc-mods/resourceful-lib",
            "Modrinth ->": "https://modrinth.com/mod/resourceful-lib",
            "GitHub ->": "https://github.com/Team-Resourceful/ResourcefulLib",
        }
    },
    {
        title: "Craftify",
        description: [
            `Craftify is a Minecraft mod that allows for the controlling of music services such as Spotify in-game.`,
            `It supports 3 services and 1 plugin allowing for many people to be able to use it. it provides a modern UI 
            that allows you to pause, play, skip, go back, control volume of any song.`,
            `Craftify internally uses a library called Jukebox which I wrote in Kotlin Multiplatform that wraps all necessary music services this allows 
            for faster updating as services may change their api but my systems wont and will adapt to their changes.`,
            `It has seen great success with thousands using it daily and over 20 million connections made to Spotify's servers daily through the mod.`
        ],
        links: {
            "Modrinth ->": "https://modrinth.com/mod/craftify",
            "CurseForge ->": "https://www.curseforge.com/minecraft/mc-mods/craftify",
            "GitHub ->": "https://github.com/ThatGravyBoat/Craftify",
            "Jukebox GitHub ->": "https://github.com/ThatGravyBoat/Jukebox",
        }
    }
]

const toElement = (htmlString) => {
    const element = document.createElement("div");
    element.innerHTML = htmlString;
    return element.firstChild;
}

const createProjectHtml = (project) => {
    const fakeWindow = document.createElement("div");
    fakeWindow.classList.add("fake-window");
    fakeWindow.classList.add("project-window");

    const fakeHeader = toElement(HEADER);
    const title = document.createElement("p");
    title.innerText = project.title;
    fakeHeader.append(title);

    const fakeBody = document.createElement("div");
    fakeBody.classList.add("fake-body");

    const projectTitle = document.createElement("h3");
    projectTitle.innerText = project.title;
    projectTitle.classList.add("project-title");

    for (let line of project.description) {
        const lineElement = document.createElement("p");
        lineElement.innerHTML = line;
        fakeBody.append(lineElement);
    }

    const linkContainer = document.createElement("div");
    linkContainer.classList.add("project-links")

    for (let [linkTitle, link] of Object.entries(project.links)) {
        const linkElement = document.createElement("a");
        linkElement.classList.add("project-link")
        linkElement.classList.add("animated-link")
        linkElement.innerText = linkTitle;
        linkElement.href = link;
        linkElement.target = "_black";
        linkContainer.append(linkElement)
    }

    fakeWindow.append(fakeHeader);
    fakeWindow.append(projectTitle);
    fakeWindow.append(fakeBody);
    fakeWindow.append(linkContainer);

    return fakeWindow;
}

for (let project of PROJECTS) {
    const projectElement = createProjectHtml(project);
    document.getElementById("projects").append(projectElement);
}