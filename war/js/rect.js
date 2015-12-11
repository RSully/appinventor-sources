/*
 * Any object that has x/y/width/height can be used as a rect
 * Any object that has x/y can be used as a point
 */


function pointInRect(point, rect) {
    return (
        point.x > rect.x &&
        point.x < (rect.width + rect.x) &&
        point.y > rect.y &&
        point.y < (rect.height + rect.y)
    );
}

function rectRight(rect) {
    return rect.x + rect.width;
}
function rectBottom(rect) {
    return rect.y + rect.height;
}

function rectTopLeft(rect) {
    return {x: rect.x, y: rect.y};
}
function rectTopRight(rect) {
    return {x: rectRight(rect), y: rect.y};
}
function rectBottomLeft(rect) {
    return {x: rect.x, y: rectBottom(rect)};
}
function rectBottomRight(rect) {
    return {x: rectRight(rect), y: rectBottom(rect)};
}

function rectIntersectsRect(rectA, rectB) {
    return (
        rectA.x < rectRight(rectB) && rectRight(rectA) > rectB.x &&
        rectA.y < rectBottom(rectB) && rectBottom(rectA) > rectB.y
    );
}
