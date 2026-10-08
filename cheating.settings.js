export * from "./cornerButtons.settings.js";
import {defaultState} from "./shop.settings.js";
export const animIncrement = 20;
export const textSize = 15;
export const textColor = "black";
export const buttons = {
    "+10": (state) => {state.elements += 10},
    "*10": (state) => {state.elements *= 10},
    "+100": (state) => {state.elements += 100},
    "*100": (state) => {state.elements *= 100},
    "reset": (state) => {
        Object.keys(state).forEach(key => {
            if (key in defaultState) {
                state[key] = defaultState[key];
            }
        });
    }
};