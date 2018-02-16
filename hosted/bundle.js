"use strict";

var socket = void 0;
var totalScore = void 0;
var myScore = 0;
var myScoreElem = void 0;

var generateScore = function generateScore() {
  /**add 10 to our personal score **/
  myScore += 10;

  myScoreElem.innerText = myScore;
  /**request to update the total world score on the
  server by 10 (again hard coded for example).**/
  socket.emit("updateScore", 10);
};

/**function to display updated score from server**/
var update = function update(data) {
  totalScore.innerText = data;
};

var init = function init() {
  totalScore = document.querySelector("#totalScore");
  myScoreElem = document.querySelector("#myScore");
  totalScore.innerText = "0"; //default text for page

  socket = io.connect();

  socket.on('connect', function () {
    /**normally this would be invoked by a user
    action, not automated **/
    setInterval(generateScore, 1200);
  });

  socket.on('updated', update);
};

window.onload = init;
