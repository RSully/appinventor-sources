/**
 * Pad a number with leading zeros
 * @see http://stackoverflow.com/a/10073788/208113
 */
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
