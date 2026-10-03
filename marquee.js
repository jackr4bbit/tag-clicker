import {messages, height, colorIncrement, movementIncrement} from "./marquee.settings.js";
import {textSize} from "./utils.js";

let message = Math.floor(Math.random() * messages.length);
let hue = 0;
let xPosition = 0;

export function start(canvas, buttons) {
    buttons.push({
        x: 0,
        y: canvas.height - height,
        width: canvas.width,
        height: height,
        hoverAction: () => {},
        clickAction: () => {
            window.open("https://jackhuey.com", "_blank");
        }
    });
}

export function frame(canvas) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, canvas.height - height, canvas.width, height);

    hue = (hue + colorIncrement) % 360;
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = `${height - 10}px Arial`;

    xPosition += movementIncrement;
    if (xPosition >= canvas.width) {
        message = (message + 1) % messages.length;
        xPosition = -textSize(canvas, messages[message]).width;
    }

    ctx.fillText(messages[message], xPosition, canvas.height - height + 5);
}