import {defaultState, tags, button, menu, animIncrement, item} from "./shop.settings.js";
import {height as marqueeHeight} from "./marquee.settings.js";
import {textSize} from "./utils.js";

export {tags};
export let state =  JSON.parse(localStorage.getItem("state")) ?? defaultState;

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

    buttons.push({
        x: () => canvas.width - anim + menu.strokeWidth + menu.strokeWidth + item.gap,
        y: () => button.y + button.height + menu.y + menu.strokeWidth + item.gap,
        width: menu.width - (menu.strokeWidth + item.gap) * 2,
        height: item.height,
        hoverAction: (isMouseInside) => {
            if (isMouseInside && (tags.length <= state.tag + 1 || tags.length > state.tag + 1 && state.elements < tags[state.tag + 1].price)) {
                canvas.style.cursor = "not-allowed";
            }
        },
        clickAction: () => {
            if (tags.length > state.tag + 1 && state.elements >= tags[state.tag + 1].price) {
                state.tag++;
                state.elements -= tags[state.tag].price;
            }
        }
    });
}

let anim = 0;

const cartImg = new Image();
cartImg.src = "cart.svg";

export function frame(canvas) {
    localStorage.setItem("state", JSON.stringify(state));
    const ctx = canvas.getContext("2d");

    //Draw button
    ctx.fillStyle = button.fill;
    ctx.strokeStyle = button.stroke;
    ctx.lineWidth = button.strokeWidth;
    ctx.fillRect(canvas.width - button.x - button.width, button.y, button.width, button.height);
    ctx.strokeRect(canvas.width - button.x - button.width, button.y, button.width, button.height);
    ctx.drawImage(cartImg, canvas.width - button.x - button.width + button.imageMargins,  button.y + button.imageMargins, button.width - (button.imageMargins * 2), button.height - (button.imageMargins * 2));

    //Animation
    if (menuOpen) {
        if (anim + animIncrement >= menu.x + menu.width + menu.strokeWidth) {
            anim = menu.x + menu.width + menu.strokeWidth;
        } else {
            anim += animIncrement;
        }
    } else {
        if (anim - animIncrement <= 0) {
            anim = 0;
        } else {
            anim -= animIncrement;
        }
    }

    //Draw menu
    const x = canvas.width - anim + menu.strokeWidth;
    const y = button.y + button.height + menu.y;
    const height = canvas.height - marqueeHeight - menu.y - button.y - button.height - menu.y;

    ctx.fillStyle = menu.fill;
    ctx.strokeStyle = menu.stroke;
    ctx.lineWidth = menu.strokeWidth;
    ctx.fillRect(x, y, menu.width, height);
    ctx.strokeRect(x, y, menu.width, height);

    //Draw items
    ctx.strokeStyle = menu.stroke;
    ctx.lineWidth = menu.strokeWidth;
    ctx.strokeRect(x + menu.strokeWidth + item.gap, y + menu.strokeWidth + item.gap, menu.width - (menu.strokeWidth + item.gap) * 2, item.height);

    //Draw name
    ctx.font = `bold ${item.textSize}px Arial`;
    ctx.fillStyle = item.textColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const isMore = tags.length > state.tag + 1;
    ctx.fillText(isMore ? "Next tag: " : "No more tags...", x + menu.strokeWidth + item.gap + 20, y + menu.strokeWidth + item.gap + item.height/2);
    const size = textSize(canvas, "Next tag: ");

    if (isMore) {
        ctx.font = `normal ${item.textSize}px "JetBrains Mono", monospace`;
        ctx.fillText(`<${tags[state.tag + 1].name}>`, x + menu.strokeWidth + item.gap + 20 + size.width, y + menu.strokeWidth + item.gap + item.height / 2);
    }

    //Draw stats
    ctx.font = `${item.textSize * 0.75}px Arial`;
    ctx.textBaseline = "bottom";
    ctx.fillText(`${isMore ? tags[state.tag + 1].price : "∞"} elements`, x + menu.strokeWidth + item.gap + 20, y + menu.strokeWidth + item.gap + item.height / 2 - 20);
    ctx.textBaseline = "top";
    ctx.fillText(isMore ? `${tags[state.tag + 1].epc} EpC` : "More tags may come in a future update...", x + menu.strokeWidth + item.gap + 20, y + menu.strokeWidth + item.gap + item.height / 2 + 20);
}