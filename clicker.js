import {tags, min, max, hoverSize, increment, color, countSize, epcSize, rotationAmount67, increment67} from "./clicker.settings.js";
import {textSize} from "./utils.js";

let tag = 0;

let fontSize = min;
let growing = true;
let hover = false;
let rotation67 = 0;
let rotating67 = true

let elements = localStorage.getItem("elements") ?? 0;

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
                elements++;
                localStorage.setItem("elements", elements);
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
    if (elements == 67 || rotation67 !== 0) {
        if (rotating67) {
            rotation67 += increment67;
            if (rotation67 > rotationAmount67) rotating67 = false;
        } else {
            rotation67 -= increment67;
            if (rotation67 < -rotationAmount67) rotating67 = true;
        }

        ctx.save();
        ctx.translate(canvas.width / 2, (canvas.height / 2) - (max * 2.5));
        ctx.rotate((rotation67 * Math.PI) / 180);
        ctx.fillText(`${elements} DOM elements`, 0, 0);
        ctx.restore();
    } else {
        ctx.fillText(`${elements} DOM elements`, canvas.width / 2, (canvas.height / 2) - (max * 2.5));
    }

    ctx.font = `${epcSize}px Arial`;
    ctx.fillText(`${tags[tag].epc} EpC`, canvas.width / 2, (canvas.height / 2) - (max * 1.5));

    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    ctx.fillText(`<${tags[tag].name}>`, canvas.width / 2, canvas.height / 2);
}