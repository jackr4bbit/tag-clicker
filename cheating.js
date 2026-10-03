import {x, y, width, height, fill, stroke, strokeWidth, imageMargins} from "./cheating.settings.js";

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
    buttons = privateButtons;
    if (localStorage.getItem("hacks")) {console.log(window.enableHacks())}
}

window.enableHacks = function () {
    //Turn on hacks and save to persistent storage
    hacks = true;
    localStorage.setItem("hacks", true);

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

    return "Hacks enabled! Use the panel in the top-left corner.";
}

const wrenchImg = new Image();
wrenchImg.src = "wrench.svg";

export function frame(canvas) {
    if (hacks) {
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = fill;
        ctx.fillRect(x, y, width, height);

        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth;
        ctx.strokeRect(x, y, width, height);

        ctx.drawImage(wrenchImg, x + imageMargins, y + imageMargins, width - (imageMargins * 2), height - (imageMargins * 2));
    }
}