import {tags, x, y, width, height, fill, stroke, strokeWidth, imageMargins} from "./shop.settings.js";

export {tags};
export let state = {tag: 0, scripts: 0, eventListeners: 0};

let menuOpen = false;

export function start(canvas, buttons) {
    buttons.push({
        x: () => canvas.width - x - width,
        y: y,
        width: width,
        height: height,
        hoverAction: () => {},
        clickAction: () => {
            menuOpen = !menuOpen;
        }
    });
}

const cartImg = new Image();
cartImg.src = "cart.svg";

export function frame(canvas) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = fill;
    ctx.fillRect(canvas.width - x - width, y, width, height);

    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    ctx.strokeRect(canvas.width - x - width, y, width, height);

    ctx.drawImage(cartImg, canvas.width - x - width + imageMargins,  y + imageMargins, width - (imageMargins * 2), height - (imageMargins * 2));
}