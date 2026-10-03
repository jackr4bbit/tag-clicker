export function start(canvas) {
    frame(canvas);
}

export function frame(canvas) {
    //Resize content
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Clear screen and draw background
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = window.getComputedStyle(document.documentElement).backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}