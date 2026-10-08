import {defaultState, tags, eventListeners, items, button, menu, animIncrement, item} from "./shop.settings.js";
import {height as marqueeHeight} from "./marquee.settings.js";
import {textSize, callValue} from "./utils.js";
import {scriptStats} from "./autoclick.js";

export {tags};
export let state =  JSON.parse(localStorage.getItem("state")) ?? structuredClone(defaultState);

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

    items.filter(shopItem => !state.eventListeners.includes(shopItem.listener)).forEach((shopItem, i) => {
        buttons.push({
            x: () => canvas.width - anim + menu.strokeWidth + menu.strokeWidth + item.gap,
            y: () => button.y + button.height + menu.y + menu.strokeWidth + item.gap * (i + 1) + item.height * i,
            width: menu.width - (menu.strokeWidth + item.gap) * 2,
            height: item.height,
            hoverAction: (isMouseInside) => {
                if (isMouseInside && !callValue(shopItem.buyable, [state])) {
                    canvas.style.cursor = "not-allowed";
                }
            },
            clickAction: () => {
                if (callValue(shopItem.buyable, [state])) {
                    shopItem.buy(state);
                    if (!callValue(shopItem.buyable, [state])) {
                        canvas.style.cursor = "not-allowed";
                    }
                }
            }
        });
    });

    state.eventListeners.forEach(listener => {
       eventListeners[listener].run(state, scriptStats);
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
    items.filter(shopItem => !state.eventListeners.includes(shopItem.listener)).forEach((shopItem, i) => {
        ctx.strokeStyle = menu.stroke;
        ctx.lineWidth = menu.strokeWidth;
        ctx.strokeRect(x + menu.strokeWidth + item.gap, y + menu.strokeWidth + item.gap * (i + 1) + item.height * i, menu.width - (menu.strokeWidth + item.gap) * 2, item.height);

        //Draw name
        ctx.fillStyle = item.textColor;
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        let size = {width: 0, height: 0};
        shopItem.label.forEach(segment => {
            const text = callValue(segment.text, [state]);
            ctx.font = `${segment.style ?? ""} ${item.textSize}px ${segment.typeface ?? ""}`;
            ctx.fillText(text, x + menu.strokeWidth + item.gap + 20 + size.width, y + menu.strokeWidth + ((item.gap + item.height) * (i + 1)) - item.height / 2);
            size = textSize(canvas, text);
        });

        //Draw stats
        ctx.font = `${item.textSize * 0.75}px Arial`;
        ctx.textBaseline = "bottom";
        ctx.fillText(`${callValue(shopItem.price, [state])} elements`, x + menu.strokeWidth + item.gap + 20, y + menu.strokeWidth + ((item.gap + item.height) * (i + 1)) - item.height / 2 - 20);
        ctx.textBaseline = "top";
        ctx.fillText(callValue(shopItem.stat, [state]), x + menu.strokeWidth + item.gap + 20, y + menu.strokeWidth + ((item.gap + item.height) * (i + 1)) - item.height / 2 + 20);
    });
}