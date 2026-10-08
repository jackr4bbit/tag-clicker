import {x, y, width, height, fill, stroke, strokeWidth, imageMargins, animIncrement, textSize, textColor, buttons as cheatingButtons} from "./cheating.settings.js";
import {state} from "./shop.js";

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

let hacks = false;
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
        x: x,
        y: y,
        width: width,
        height: height,
        hoverAction: () => {},
        clickAction: () => {
            menuOpen = !menuOpen;
        }
    });

    Object.keys(anims).forEach((label) => {
        buttons.push({
            x: x,
            y: () => anims[label],
            width: width,
            height: height,
            hoverAction: () => {},
            clickAction: () => {
                if (anims[label] >= height) {
                    cheatingButtons[label](state);
                }
            }
        });
    });

    return "Hacks enabled! Use the panel in the top-left corner.";
}

const wrenchImg = new Image();
wrenchImg.src = "wrench.svg";
const resetImg = new Image();
resetImg.src = "reset.svg";

const buttonSizeGap = y * 2 + height + strokeWidth * 2;

let anims = Object.fromEntries(
    Object.keys(cheatingButtons).map(key => [key, 0])
);

export function frame(canvas) {
    if (hacks) {
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        //Animation
        Object.keys(anims).forEach((label, i) => {
            i = i + 1;
            if (menuOpen) {
                if (anims[label] + animIncrement >= y + buttonSizeGap * i) {
                    anims[label] = y + buttonSizeGap * i;
                } else {
                    anims[label] += animIncrement;
                }
            } else {
                if (anims[label] - animIncrement <= y) {
                    anims[label] = y;
                } else {
                    anims[label] -= animIncrement;
                }
            }

            ctx.fillStyle = fill;
            ctx.fillRect(x, anims[label], width, height);
            ctx.strokeRect(x, anims[label], width, height);
            ctx.fillRect(x, anims[label], width, height);
            ctx.strokeRect(x, anims[label], width, height);

            if (label === "reset") {
                ctx.drawImage(resetImg, x + imageMargins, anims[label] + imageMargins, width - (imageMargins * 2), height - (imageMargins * 2));
            } else {
                ctx.font = `${textSize}px Arial`;
                ctx.fillStyle = textColor;
                ctx.fillText(label, x + width / 2, anims[label] + height / 2);
            }
        });

        ctx.fillStyle = fill;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
        ctx.drawImage(wrenchImg, x + imageMargins, y + imageMargins, width - (imageMargins * 2), height - (imageMargins * 2));
    }
}