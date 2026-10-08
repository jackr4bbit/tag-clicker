import {state} from "./shop.js";

let lastFrame = performance.now();

export function frame() {
    const currentTime = performance.now();
    const timePassed = currentTime - lastFrame;

    if (timePassed >= 1000 / state.scripts) {
        state.elements++;
        lastFrame = currentTime;
    }
}