"use strict";

var css = document.createElement('link');
css.type = "text/css";
css.rel = "stylesheet";

if (navigator.userAgent.match(/iPad/i) != null) {
  css.href = "css/old-device-style.css";
} else {
  css.href = "css/style.css";
}

var h = document.getElementsByTagName('head')[0];
h.appendChild(css);