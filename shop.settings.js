export const defaultState = {elements: 0, tag: 0, scripts: 0, eventListeners: 0};
export const tags = [{name: "html", epc: 1, price: 0}, {name: "head", epc: 2, price: 50}, {name: "title", epc: 3, price: 80}, {name: "style", epc: 5, price: 125}, {name: "body", epc: 10, price: 350}, {name: "p", epc: 20, price: 800}, {name: "div", epc: 25, price: 1000}];
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