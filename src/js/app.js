
TweenMax.to(".cloud", 2, {y: 15, x: 5, yoyo: true, repeat: -1, ease: Power2.easeInOut});

let cheeseBoardTimeline = new TimelineMax();

$(function () {

	let scene = $('#scene').get(0);
	let parallax = new Parallax(scene);	
});

$(function () {

	let gameScene = $('#game-scene').get(0);
	let parallax = new Parallax(gameScene);	
});

$(function () {

	let endScene = $('#end-scene').get(0);
	let parallax = new Parallax(endScene);	
});

const breakpoint = window.matchMedia( "(min-width: 600px)" );

let timeline = new TimelineMax();
timeline.to("#loading", 1, {width: "5%", ease: Power0.easeInOut});
timeline.to("#loading", 1, {width: "25%", ease: Power0.easeInOut});
timeline.to("#loading", 1, {width: "98%", ease: Power0.easeInOut});
timeline.to(".loading-screen", 1, {display: "none"});
timeline.to(".game-setup", 2, {display: "block"});
timeline.to(".mouse", 3, {left: "110%"});

let helpButton = document.querySelector(".help-button");
helpButton.onclick = function () {
	console.log("test");
	let infoWindow = document.querySelector(".instructions-white-bg")
	infoWindow.classList.toggle("active");
}

let gameStartButton = document.querySelector(".game-button");
gameStartButton.onclick = function () {
	console.log("test");
	if (breakpoint.matches) {
		cheeseBoardTimeline.to(".desktop-cheeseboard", 2, {top: "60%", left: "50%", y: '-50%', x: '-50%'});
		TweenMax.to(this, 0.1, {display: "none"});
		TweenMax.to(".desktop-game-instrutions", 0.1, {display: "none"});
		TweenMax.to(".game-start-arrow", 0.1, {display: "none"});
		TweenMax.to(".raining-cheeses", 0.5, {display: "block"});
	} else {
		// TweenMax.to(".game-setup", 1, {display: "none"});
		// TweenMax.to(".game-end", .4, {display: "block", left: 0});
		TweenMax.to(".mouse", 3, {left: "120%"});
		TweenMax.to(".game-setup", 1, {display: "none", delay: .5});
		TweenMax.to(".game-start", 1, {display: "block", delay: .5});
	}
}

// document.querySelectorAll(".flying-cheese").forEach(dragCheese($cheese));
for (var i = 0; i < document.querySelectorAll(".flying-cheese").length; i++) {
	dragCheese(document.querySelectorAll(".flying-cheese")[i]);
}
function dragCheese(cheese) {
	cheese.classList.remove("paired");
	let cheeseBoardDesktop =  document.querySelector(".desktop-cheeseboard");
	cheeseBoardDesktop.classList.remove("active");
	cheeseBoardTimeline.restart();

	let dropFinals = document.querySelectorAll(".cheese-container");
	let overlapThreshold = "50%"; 
	let $container = document.querySelector( cheese.getAttribute("data-container") );
	let $containerDesktop = document.querySelector( cheese.getAttribute("data-container-desktop") );

	let animation = TweenMax.fromTo(cheese, 7, {
		left: (Math.floor(Math.random() * 90) + 1)+ "vw", 
		top: "-5%", 
		repeat: -1
	},  { 
		top: "110%", 
		repeat: -1,
		ease: Linear.easeNone
	});

	Draggable.create(cheese, {
		onDrag: function() {
			console.log("onDrag");
			animation.pause();
		},
		onDragEnd: function(){
			console.log("onDragEnd");

			if (breakpoint.matches) {
				if (this.hitTest($containerDesktop, overlapThreshold))	{
					console.log("it worked", this);
					this.kill();
					animation.kill();
					cheese.classList.add("paired");
				} else {
					animation.resume()
				}
			} else {
				if (this.hitTest($container, overlapThreshold))	{
					console.log("it worked", this);
					this.kill();
					animation.kill();
					cheese.classList.add("paired");
				} else {
					animation.resume()
				}
			}

			let pairedCheeses = document.querySelectorAll(".paired");
				
			if ( pairedCheeses.length < 5 ) {
				console.log("game over");
			} else {
				console.log('all paired');

				if (breakpoint.matches) {
					let cheeseBoardDesktop =  document.querySelector(".desktop-cheeseboard");
					cheeseBoardDesktop.classList.add("active");

					cheeseBoardTimeline.reverse();
					TweenMax.to(".raining-cheeses", 0.1, {display: "none"});
					TweenMax.to(".overlay", 0.1, {display: "block"});
					TweenMax.to(".winning-overlay", 0.5, {display: "block"});
					TweenMax.to(".play-again-desktop", 0.5, {display: "block"});

				} else {

					let timelineGameEnd = new TimelineMax();
					timelineGameEnd.to(".game-message-start", 0.01, {display: "none"});
					timelineGameEnd.to(".game-message-win", 1, {display: "block"});
					TweenMax.to(".game-button-win", 1, {display: "block"});

					let gameButtonWin = document.querySelector(".game-button-win");
					gameButtonWin.onclick = function () {
						console.log('game ended')
						let timelineAfterGame = new TimelineMax();
						timelineAfterGame.to(".mouse", 2, {left: "-20%"});
						timelineAfterGame.to(".game-start", 1, {left: "-100%", top: "0%", display: "none"}, "slide-together");
						timelineAfterGame.fromTo(".game-end", 1, {left: "100%"}, {left: 0, top: 0, display: "block"}, "slide-together");
					}
				}
			}
		}
	})
}
let playAgainButtonDesktop = document.querySelector(".play-again-desktop");
playAgainButtonDesktop.onclick = function () {
	let cheese = document.querySelectorAll(".flying-cheese");
	for (var i = 0; i < cheese.length; i++) {
		dragCheese(cheese[i]);
	}
	TweenMax.to(".raining-cheeses", 0.1, {display: "block"});
	TweenMax.to(".overlay", 0.1, {display: "none"});
	TweenMax.to(".winning-overlay", 0.5, {display: "none"});
	TweenMax.to(".play-again-desktop", 0.5, {display: "none"});
}

let playAgainButtonMobile = document.querySelector(".play-again-button-mobile");
playAgainButtonMobile.onclick = function () {
	let cheese = document.querySelectorAll(".flying-cheese");
	for (var i = 0; i < cheese.length; i++) {
		dragCheese(cheese[i]);
	}


	TweenMax.to(".game-end", 0.5, {display: "none"});
	TweenMax.to(".game-message", 0.5, {display: "none"});
	TweenMax.to(".game-message-win", 0.5, {display: "none"});
	TweenMax.to(".game-button-win", 0.5, {display: "none"});
	TweenMax.to(".game-start", 1, {left: "0%", display: "block"});	
}
