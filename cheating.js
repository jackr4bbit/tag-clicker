console.log(
    "%cDon't cheat!",
    "color: red; font-size: 50px; font-weight: bold;"
);

console.log(
    "%cI don't think you can edit any game data from here, but still...",
    "color: red; font-size: 15px; font-weight: bold;"
);

console.log(
    "%cNo matter what, do not run enableHacks()",
    "color: #232327; font-size: 6px; font-weight: bold;"
);

let hacks =  false;
let menuOpen = false;
let buttons = null;

export function start(canvas, privateButtons) {
    buttons = privateButtons
    if (localStorage.getItem("hacks")) {window.enableHacks()}
}

window.enableHacks = function () {
    //Turn on hacks and save to persistent storage
    hacks = true
    localStorage.setItem("hacks", true)

    //Add button
    buttons.push({
        x: 10,
        y: 10,
        width: 25,
        height: 25,
        hoverAction: () => {},
        clickAction: () => {
            menuOpen = !menuOpen;
        }
    });
}

const wrenchImg = new Image();
wrenchImg.src = "/wrench.svg";

export function frame(canvas) {
    if (hacks) {
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "white";
        ctx.fillRect(10, 10, 25, 25);

        ctx.strokeStyle = "gray";
        ctx.lineWidth = 4;
        ctx.strokeRect(10, 10, 25, 25);

        ctx.drawImage(wrenchImg, 12, 12, 21, 21);
    }
}