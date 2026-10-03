import {tags, min, max, hoverSize, increment, color, countSize, epcSize} from "./clicker.settings.js";
import {textSize} from "./utils.js";

let tag = 0;

let fontSize = min;
let growing = true;
let hover = false;

let clicks = localStorage.getItem("clicks") ?? 0;

export function start(canvas, buttons) {
    frame(canvas, buttons);
    buttons.push(
        {
            x: (canvas) => (canvas.width / 2) - (textSize(canvas, `<${tags[tag].name}>`).width / 2),
            y: (canvas) => (canvas.height / 2) - (textSize(canvas, `<${tags[tag].name}>`).height / 2),
            width: (canvas) => textSize(canvas, `<${tags[tag].name}>`).width,
            height: (canvas) => textSize(canvas, `<${tags[tag].name}>`).height,
            hoverAction: (isMouseInside) => {
                hover = isMouseInside;
            },
            clickAction: () => {
                clicks ++;
                localStorage.setItem("clicks", clicks);
            }
        }
    );
}

export function frame(canvas) {
    if (hover) {
        if (fontSize <= hoverSize) {
            fontSize += increment;
        }
    } else if (growing) {
        fontSize += increment;
        if (fontSize > max) growing = false;
    } else {
        fontSize -= increment;
        if (fontSize < min) growing = true;
    }

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = color;
    ctx.textAlign = "center";

    ctx.font = `${countSize}px Arial`;
    ctx.fillText(`${clicks} DOM elements`, canvas.width / 2, (canvas.height / 2) - (max * 2.5));

    ctx.font = `${epcSize}px Arial`;
    ctx.fillText(`${tags[tag].epc} EpC`, canvas.width / 2, (canvas.height / 2) - (max * 1.5));

    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    ctx.fillText(`<${tags[tag].name}>`, canvas.width / 2, canvas.height / 2);
}