"use strict";

var css = document.createElement('link');
css.type = "text/css";
css.rel = "stylesheet";

function checkUserAgent(userAgent) {
  var presto = "presto";
  var chrome = "chrome";
  var ua = userAgent.toLowerCase();

  if (ua.indexOf(presto) != -1) {
    return true;
  } else if (ua.indexOf(chrome) != -1) {
    var position = ua.indexOf(chrome);
    var version = ua[position + chrome.length + 1] + ua[position + chrome.length + 2];

    if (!isNaN(version)) {
      version = parseInt(version);
      if (version < 53) return true;else return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

if (checkUserAgent(navigator.userAgent)) {
  css.href = "css/old-device-style.css";
} else {
  css.href = "css/style.css";
}

var h = document.getElementsByTagName('head')[0];
h.appendChild(css);