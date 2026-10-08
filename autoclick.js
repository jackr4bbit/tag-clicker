import {state} from "./shop.js";

export let scriptStats = {eps: 1, wait: 1000};

let lastFrame = performance.now();
let lastWait = scriptStats.wait;

export function frame() {
    const currentTime = performance.now();
    const timePassed = currentTime - lastFrame;

    if (timePassed >= scriptStats.wait / state.scripts) {
        state.elements += scriptStats.eps;
        lastFrame = currentTime;
    }

    if (scriptStats.wait === lastWait) {
        scriptStats.wait = 1000;
    }
    lastWait = scriptStats.wait;
}