
(() => {
	console.log("Hello World from app.js, transpiled and concatenated!");
})();

let pulseButton = document.querySelector(".pulse-button");
console.log(pulseButton);

pulseButton.onclick = function (e) {
	let page1 = document.querySelector(".page1");
	e.preventDefault();
	console.log(e.clientY);

};

TweenMax.to(".cloud", 2, {left: 15, top: 5, yoyo: true, repeat: -1});