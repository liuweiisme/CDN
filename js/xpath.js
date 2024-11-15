let _elementP, _element;

function getXPath(e) {
    if ("" !== e.id) return '//*[@id="' + e.id + '"]';
    if (e === document.body) return "/html/body";
    for (var t = 1, a = e.parentNode ? e.parentNode.childNodes : [], o = 0; o < a.length; o++) {
        var n = a[o];
        if (n === e) {
            var r = getXPath(e.parentNode) + "/" + e.tagName.toLowerCase() + "[" + t + "]";
            return e !== _elementP && e !== _element || (r = getXPath(e.parentNode) + "/" + e.tagName.toLowerCase()), r
        }
        1 === n.nodeType && n.tagName === e.tagName && t++
    }
}

function getParentXPath(e) {
    return e.parentNode ? getXPath(e.parentNode) : ""
}
document.addEventListener("click", (function(e) {
    if (e.ctrlKey) {
        e.preventDefault(), e.stopPropagation();
        var t = e.target;
        if ("body" !== t.tagName.toLowerCase()) {
            t.style.cssText = "background:#e5f5e9;border:2px solid #00a23b;height:auto;", _elementP = t.parentNode, _element = t;
            const e = `${getParentXPath(t)}/${t.tagName.toLowerCase()}`;
            window.chrome.webview.postMessage(e), console.log(e)
        }
    }
}));