//Set up canvas
const canvas = document.getElementById("game");

//Import modules
import modules from "./game.settings.js";
const importedModules = await Promise.all(modules.map(path => import(`./${path}.js`)));
const buttons = [];
function runAll(funcs) {
    funcs.forEach(func => {if (func) {func(canvas, buttons)}});
}

//Run on start
runAll(importedModules.map(mod => mod.start));

//Run on each frame
const eachFrame = importedModules.map(mod => mod.frame);
function draw() {
    runAll(eachFrame);
    requestAnimationFrame(draw);
}

draw();

//Button event listeners
canvas.addEventListener("mousemove", (event) => {
    canvas.style.cursor = "default";
    buttons.forEach(button => {
        const mouse = isMouseInside(canvas, event, button);
        if (mouse) {
            canvas.style.cursor = "pointer";
        }
        button.hoverAction(mouse);
    });
});

canvas.addEventListener("click", (event) => {
    buttons.forEach(button => {
        if (isMouseInside(canvas, event, button)) {
            button.clickAction();
        }
    });
});

function isMouseInside(canvas, event, button) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const x = typeof button.x === "function" ? button.x() : button.x;
    const y = typeof button.y === "function" ? button.y() : button.y;
    const width = typeof button.width === "function" ? button.width() : button.width;
    const height = typeof button.height === "function" ? button.height() : button.height;
    
    return mouseX >= x &&
        mouseX <= x + width &&
        mouseY >= y &&
        mouseY <= y + height;
}