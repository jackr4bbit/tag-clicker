import {tags, button, menu, animIncrement} from "./shop.settings.js";
import {height as marqueeHeight} from "./marquee.settings.js";

export {tags};
export let state = {tag: 0, scripts: 0, eventListeners: 0};

let menuOpen = false;

export function start(canvas, buttons) {
    buttons.push({
        x: () => canvas.width - button.x - button.width,
        y: button.y,
        width: button.width,
        height: button.height,
        hoverAction: () => {},
        clickAction: () => {
            menuOpen = !menuOpen;
        }
    });
}

let animX = 0;

const cartImg = new Image();
cartImg.src = "cart.svg";

export function frame(canvas) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = button.fill;
    ctx.strokeStyle = button.stroke;
    ctx.lineWidth = button.strokeWidth;
    ctx.fillRect(canvas.width - button.x - button.width, button.y, button.width, button.height);
    ctx.strokeRect(canvas.width - button.x - button.width, button.y, button.width, button.height);
    ctx.drawImage(cartImg, canvas.width - button.x - button.width + button.imageMargins,  button.y + button.imageMargins, button.width - (button.imageMargins * 2), button.height - (button.imageMargins * 2));

    if (menuOpen) {
        if (animX + animIncrement >= menu.x + menu.width + menu.strokeWidth) {
            animX = menu.x + menu.width + menu.strokeWidth;
        } else {
            animX += animIncrement;
        }
    } else {
        if (animX - animIncrement <= 0) {
            animX = 0;
        } else {
            animX -= animIncrement;
        }
    }

    const x = canvas.width - animX + menu.strokeWidth;
    const y = button.y + button.height + menu.y;
    const height = canvas.height - marqueeHeight - menu.y - button.y - button.height - menu.y;

    ctx.fillStyle = button.fill;
    ctx.strokeStyle = menu.stroke;
    ctx.lineWidth = menu.strokeWidth;
    ctx.fillRect(x, y, menu.width, height);
    ctx.strokeRect(x, y, menu.width, height);
}