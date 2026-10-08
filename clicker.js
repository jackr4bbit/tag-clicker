import {min, max, hoverSize, increment, color, countSize, epcSize, rotationAmount67, increment67} from "./clicker.settings.js";
import {tags, state} from "./shop.js";
import {textSize} from "./utils.js";

let fontSize = min;
let growing = true;
let hover = false;
let rotation67 = 0;
let rotating67 = true;

export function start(canvas, buttons) {
    const ctx = canvas.getContext("2d");
    buttons.push(
        {
            all: () => {
                ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
                const size = textSize(canvas, `<${tags[state.tag].name}>`);
                return {
                    x: (canvas.width / 2) - (size.width / 2),
                    y: (canvas.height / 2) - size.height,
                    width: size.width,
                    height: size.height
                }
            },
            hoverAction: (isMouseInside) => {
                hover = isMouseInside;
            },
            clickAction: () => {
                state.elements += tags[state.tag].epc;
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
    if (state.elements == 67 || rotation67 !== 0) {
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
        ctx.fillText(`${state.elements} DOM elements`, 0, 0);
        ctx.restore();
    } else {
        ctx.fillText(`${state.elements} DOM elements`, canvas.width / 2, (canvas.height / 2) - (max * 2.5));
    }

    ctx.font = `${epcSize}px Arial`;
    ctx.fillText(`${tags[state.tag].epc} EpC`, canvas.width / 2, (canvas.height / 2) - (max * 1.5));

    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    ctx.fillText(`<${tags[state.tag].name}>`, canvas.width / 2, canvas.height / 2);
}