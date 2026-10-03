export function textSize(canvas, text) {
    const metrics = canvas.getContext("2d").measureText(text);
    return {width: metrics.width, height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent};
}