/**#ES6 file to be converted into an ES5 file
    Our babel build/watch scripts in the package.json
    will convert this into ES5 and put it into the hosted folder.
**/

let socket; 
let totalScore;
let myScore = 0;
let myScoreElem;

const generateScore = () => {
  /**add 10 to our personal score **/
  myScore += 10;

  myScoreElem.innerText = myScore;
  /**request to update the total world score on the
	 server by 10 (again hard coded for example).**/
  socket.emit("updateScore", 10);
}

/**function to display updated score from server**/
const update = (data) => {
  totalScore.innerText = data;
}

const init = () => {
  totalScore = document.querySelector("#totalScore");
  myScoreElem = document.querySelector("#myScore");
  totalScore.innerText = "0"; //default text for page

  socket = io.connect();

  socket.on('connect', () => {
	  /**normally this would be invoked by a user
		action, not automated **/
	  setInterval(generateScore, 1200);
  });      

  socket.on('updated', update);
}

window.onload = init;