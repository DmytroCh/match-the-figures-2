"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var counter = 0;
var refCounter = document.getElementById("counter");
var timer = document.getElementById("timer");
var timerInterval = null;
var end = false;
var blackDisplay = document.getElementById("black-display");
var alertLayout = document.getElementById("alert-layout");
var focus_position = {
  x: 1,
  y: 0
};
var timerValue = {
  hour: 0,
  min: 0,
  sec: 0
};

function setImages(imPositionsArray) {
  var htmlCode = '';
  imPositionsArray.forEach(function (element) {
    htmlCode += "\n        <div class=\"image\">\n            <img src=\"" + element.imageUrl + "\" alt=\"image.png\">    \n            <div class=\"cover\" tabindex=\"-1\"></div>            \n        </div>";
  });
  document.getElementById('grid').innerHTML = htmlCode;
}

function generatePositions(images) {
  var arr = [];
  var counter;
  var offeredPosition;
  images.forEach(function (element) {
    counter = 0;

    while (counter < 2) {
      offeredPosition = Math.floor(Math.random(20) * 20) + 1;

      if (!arr.includes(offeredPosition)) {
        arr.push({
          position: offeredPosition,
          imageUrl: "./img/".concat(element, ".svg")
        });
        counter++;
      }
    }
  });
  arr.sort(function (a, b) {
    return a.position - b.position;
  });
  return arr;
}

function setListeners() {
  var grid = document.getElementById("grid");
  var opened = [];
  var first = null;
  var second = null;
  grid.addEventListener('click', function (event) {
    //console.log(event.target);
    if (event.target.classList.contains("cover")) {
      if (!opened.includes(event.target)) {
        if (first == null) {
          first = event.target;
          first.classList.add("selected");
        } else if (second == null) {
          if (first != event.target) {
            second = event.target;
            second.classList.add("selected");

            if (first.parentNode.getElementsByTagName("img")[0].src == second.parentNode.getElementsByTagName("img")[0].src) {
              first.parentNode.classList.add('finded');
              second.parentNode.classList.add("finded");
              opened.push(first);
              opened.push(second);
              first = null;
              second = null;
            }
          }
        } else {
          first.classList.remove("selected");
          second.classList.remove("selected");
          first = event.target;
          first.classList.add("selected");
          second = null;
        }

        counter++;
        refCounter.innerText = "moves: " + counter;
      }

      checkTheEnd();
    }
  });
}

function setFinalData() {
  var finalTime = document.getElementById("final-time");
  var finalSteps = document.getElementById("final-steps");
  finalTime.innerText = "Time: " + timer.innerText;
  finalSteps.innerText = "moves: " + counter;
}

function checkTheEnd() {
  var theEnd = true;

  var arr = _toConsumableArray(document.getElementById("grid").childNodes);

  var support = [];

  for (var i = 0; i < arr.length; i++) {
    if (i % 2 != 0) support.push(arr[i]);
  } //console.log(support);


  support.forEach(function (node) {
    if (!node.classList.contains("finded")) {
      theEnd = false;
    }
  });
  end = theEnd;

  if (theEnd) {
    setFinalData();
    blackDisplay.classList.add("vissible");
    alertLayout.classList.add("vissible");
    clearInterval(timerInterval);
  }
}

function buttonActions() {
  blackDisplay.classList.remove("vissible");
  alertLayout.classList.remove("vissible");
  counter = 0;
  setImages(generatePositions(images));
  refCounter.innerText = "moves: " + counter;
  resetTimer();
  clearInterval(timerInterval);
  startTime();
  timerInterval = setInterval(startTime, 1000); //startTime();
}

function resetTimer() {
  timerValue = {
    hour: 0,
    min: 0,
    sec: 0
  };
}

function startTime() {
  var h = checkTime(timerValue.hour);
  var m = checkTime(timerValue.min);
  var s = checkTime(timerValue.sec);
  timer.innerHTML = h + ":" + m + ":" + s;
  updateTimerData(); //var t = setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }

  ; // add zero in front of numbers < 10

  return i;
}

function updateTimerData() {
  if (timerValue.sec < 59) {
    timerValue.sec++;
  } else {
    timerValue.sec = 0;

    if (timerValue.min < 59) {
      timerValue.min++;
    } else {
      timerValue.min = 0;

      if (timerValue.hour < 23) {
        timerValue.hour++;
      } else {
        timerValue.hour = 0;
      }
    }
  }
}

function navigation() {
  document.getElementById("start").click();
  window.addEventListener("keydown", handler);
  var position = getProperPosition();
  var el = document.getElementById("grid").childNodes[position].childNodes[3];
  el.focus();
}

function getPosition() {
  var x = focus_position.x;
  var y = focus_position.y;
  var position = -1;

  if (x > 1) {
    position = (x - 1) * 10 + y * 2 + 1;
  } else if (x == 1) {
    position = y * 2 + 1;
  }

  return position;
}

function getProperPosition() {
  //remove focus from opened icons
  var elems = document.querySelectorAll(".focused");
  [].forEach.call(elems, function (el) {
    el.classList.remove("focused");
  });
  var actualPosition = getPosition();

  if (focus_position.x > 0) {
    var el = document.getElementById("grid").childNodes[actualPosition].childNodes[3]; //console.log(el.classList);

    if (el.classList.contains("selected")) {
      //console.log(el);
      //console.log(el.parentElement);
      el.parentElement.classList.add("focused");
    }
  }

  return actualPosition;
}

function handler(event) {
  event.preventDefault();
  var position = getProperPosition();

  if (!end) {
    console.log("Position: ", focus_position);
    console.log("Key code: ", event.keyCode);

    switch (event.keyCode) {
      case 13:
        //OK button
        var el = null;
        if (position < 0) el = document.getElementById("start");else el = document.getElementById("grid").childNodes[position].childNodes[3];
        el.click();
        break;

      case 37:
        //LEFT button
        if (focus_position.y > 0) {
          focus_position.y = focus_position.y - 1;
          position = getProperPosition();
          var _el = null;
          if (position < 0) _el = document.getElementById("start");else _el = document.getElementById("grid").childNodes[position].childNodes[3]; //console.log(document.getElementById("grid").childNodes[position].classList);

          _el.focus();
        }

        break;

      case 39:
        //RIGHT button
        if (focus_position.y < 4) {
          focus_position.y = focus_position.y + 1;
          position = getProperPosition();
          var _el2 = null;
          if (position < 0) _el2 = document.getElementById("start");else _el2 = document.getElementById("grid").childNodes[position].childNodes[3];

          _el2.focus();
        }

        break;

      case 38:
        //UP button
        if (focus_position.x > 0) {
          focus_position.x = focus_position.x - 1;
          position = getProperPosition();
          var _el3 = null;
          if (position < 0) _el3 = document.getElementById("start");else _el3 = document.getElementById("grid").childNodes[position].childNodes[3];

          _el3.focus();
        }

        break;

      case 40:
        //DOWN button
        if (focus_position.x < 4) {
          focus_position.x = focus_position.x + 1;
          position = getProperPosition();
          var _el4 = null;
          if (position < 0) _el4 = document.getElementById("start");else _el4 = document.getElementById("grid").childNodes[position].childNodes[3];

          _el4.focus();
        }

        break;

      case 461: //vewd back key

      case 8:
        //BACKSPACE
        window.close();
        break;
    }
  } else {
    var confirmButton = document.getElementById("confirm");
    confirmButton.focus();
    confirmButton.addEventListener('keyup', function (event) {
      if (event.keyCode == 13) {
        //OK button
        event.preventDefault();
        end = false;
        buttonActions();
        focus_position = {
          x: 1,
          y: 0
        };
        position = getProperPosition();
        var _el5 = document.getElementById("grid").childNodes[position].childNodes[3];

        _el5.focus();
      }
    });
  }
}

setImages(generatePositions(images));
setListeners();
navigation();