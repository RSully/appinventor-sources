function AIColor(r, g, b, a) {
    if (typeof a == 'undefined') { a = 255; }
    return '(make-color ' + AIList(r, g, b, a) + ')'
}
