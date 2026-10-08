import {scriptStats} from "./autoclick.js";

export const defaultState = {elements: 0, tag: 0, scripts: 0, eventListeners: []};
export const tags = [{name: "html", epc: 1, price: 0}, {name: "head", epc: 2, price: 50}, {name: "title", epc: 3, price: 80}, {name: "style", epc: 5, price: 125}, {name: "body", epc: 10, price: 350}, {name: "p", epc: 20, price: 800}, {name: "div", epc: 25, price: 1000}];
export const eventListeners = [
    {
        name: "mousemove",
        description: "Moving your mouse generates more elements",
        price: 150,
        run: (state, scriptStats) => {
            let lastTime = performance.now();
            let lastX = 0;
            let lastY = 0;

            document.addEventListener("mousemove", (event) => {
                const currentTime = performance.now();
                const currentX = event.clientX;
                const currentY = event.clientY;

                const timePassed = currentTime - lastTime;

                if (timePassed > 0) {
                    const distance = Math.sqrt((currentX - lastX) ** 2 + (currentY - lastY) ** 2);

                    scriptStats.eps = 1 + Math.round(distance/30);
                    lastTime = currentTime;
                    lastX = currentX;
                    lastY = currentY;
                }
            });
        }
    }
];
function isMoreTags(state) {return tags.length > state.tag + 1}
import {price as scriptPrice} from "./autoclick.settings.js";
export const items = [
    {
        label: [
            {text: (state) => isMoreTags(state) ? "Next tag: " : "No more tags...", typeface: "Arial", style: "bold"},
            {text: (state) => isMoreTags(state) ? `<${tags[state.tag + 1].name}>` : "", typeface: "\"JetBrains Mono\", monospace", style: "normal"}
        ],
        price: (state) => isMoreTags(state) ? tags[state.tag + 1].price : "∞",
        stat: (state) => isMoreTags(state) ? `${tags[state.tag + 1].epc} EpC` : "More tags may come in a future update...",
        buyable: (state) => tags.length > state.tag + 1 && state.elements >= tags[state.tag + 1].price,
        buy: (state) => {
            state.tag++;
            state.elements -= tags[state.tag].price;
        }
    },
    {
        label: [
            {text: "<script>", typeface: "\"JetBrains Mono\", monospace", style: "normal"}
        ],
        price: scriptPrice,
        stat: (state) => `Clicks for you automatically! You own ${state.scripts}.`,
        buyable: (state) => state.elements >= scriptPrice(state),
        buy: (state) => {
            state.elements -= scriptPrice(state);
            state.scripts++;
        }
    },
    ...eventListeners.map((listener, i) => ({
        label: [
            {text: "Event listener: ", typeface: "Arial", style: "bold"},
            {text: listener.name, typeface: "\"JetBrains Mono\", monospace", style: "normal"}
        ],
        price: listener.price,
        stat: listener.description,
        buyable: (state) => state.elements >= listener.price,
        buy: (state) => {
            listener.run(state, scriptStats);
            state.elements -= listener.price;
            state.eventListeners.push(i);
        },
        listener: i
    }))
];

import * as button from "./cornerButtons.settings.js";
export {button};

const fill = "white";
const stroke = "gray";
const strokeWidth = 4;
const x = 10;
const y = x;
const width = 400;
const height = 4000;
export const menu = {fill, stroke, strokeWidth, x, y, width, height};

export const animIncrement = 40;

const itemGap = y;
const itemHeight = 100;
const textSize = 20;
const textColor = "black";
export const item = {gap: itemGap, height: itemHeight, textSize, textColor};