import {defaultScriptStats} from "./autoclick.settings.js";
import {state} from "./shop.js";

export let scriptStats = structuredClone(defaultScriptStats);

let lastFrame = performance.now();
let lastStats = structuredClone(scriptStats);

export function frame() {
    const currentTime = performance.now();
    const timePassed = currentTime - lastFrame;

    if (timePassed >= scriptStats.wait / state.scripts) {
        state.elements += scriptStats.eps;
        lastFrame = currentTime;
    }

    Object.keys(lastStats).forEach((key) => {
        if (scriptStats[key] === lastStats[key] && lastStats[key] !== defaultScriptStats[key]) {
            scriptStats[key] = defaultScriptStats[key];
        }
    });

    lastStats = structuredClone(scriptStats);
}