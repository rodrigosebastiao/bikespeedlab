window.onload = function () {/*Initialize*/
	Update();
};

var menu = document.getElementById("menu");
menu.addEventListener("click", Update, true);

function gearEngaged() {//Ratio of gears and cogs and cranks teeth's sizes
	var currentGear = 0;
	var frontCranks = document.getElementsByClassName("chainring");//Parent of leftShifter
	var leftShifter = document.getElementById("leftShifter").value;//receive input
	var rearCogs = document.getElementsByClassName("cog");//Parent of rightShifter
	var rightShifter = document.getElementById("rightShifter").value;//receive input
	var currentGear = parseFloat((frontCranks[leftShifter - 1].value / rearCogs[rightShifter - 1].value).toFixed(2));//Calculate front and rear positions
	colorSlector(leftShifter, rightShifter);//gear color positions
	return currentGear;
}


function Update() {
	gearEngaged();
}

/********************
***GLOBAL VARIABLES**
*********************/
var rpm = document.getElementById("pedalRevolutions").value //eg.: 70, 120
var gear = gearEngaged();//current gear position
var crankLength = (document.getElementById("crankLength").value)/1000;//mm to meters
var tireCircum = ((document.getElementById("tiresCirc").value / 10) / 2.54).toFixed(2);//tireCirc to cm to inch (a inch = 2.54)
var distanceTrav = ((tireCircum * 2.54) / 100).toFixed(2);//wheelDist INCH to CM to METERS
var KMh = ((distanceTrav * 60) / 1000).toFixed(2);//Bike speed total in KM/h
var ms = ((distanceTrav / 60)).toFixed(2);//Bike speed total in m/s

function colorSlector(left, right) {
	var arrInputChainrings = document.getElementsByClassName("chainring");

	for (var i = 0; i < arrInputChainrings.length; i++) {/*clear all colors*/
		arrInputChainrings[i].style.background = "";
	}
	arrInputChainrings[left - 1].style.background = "#FA5";/*set color*/

	//Break to cogs
	var arrInputCogs = document.getElementsByClassName("cog");

	for (var h = 0; h < arrInputCogs.length; h++) {/*clear all colors*/
		arrInputCogs[h].style.background = "";
	}
	arrInputCogs[right - 1].style.background = "#FA5";/*set color*/
}

function start() {
	gear = gearEngaged();
}

function stop() {
	gear = 0;
}

var speed = 0;
var crankSpin = 0;
var tireSpin = 0;
var cogSpin = 0;
	
function drawCanvas() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var translateX = canvas.width / 2; 
	var translateY = canvas.height / 2;
	var posX = 100;
	var posY = 0;
	//Load Images
	var tirefImg = new Image();
	var tirebImg = new Image();
	var frameImg = new Image();
	var crankImg = new Image();
	var pedalImg = new Image();
	var cogsImg = new Image();
	var chainImg = new Image();
	var frameImg = new Image();

	tirefImg.src = 'images/tiref.png';
	tirebImg.src = 'images/tireb.png';
	frameImg.src = 'images/frame.png';
	crankImg.src = 'images/crank.png';
	pedalImg.src = 'images/pedal.png';
	cogsImg.src = 'images/cogs.png';
	frameImg.src = 'images/frame.png';

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	speed += KMh;
	crankSpin += crankLength * rpm;
	tireSpin += tireCircum;
	cogSpin += tireCircum;
	ctx.save();//General save
		ctx.translate(posX, posY);//canvas elements position
		//Back tire
		ctx.save();
		ctx.translate(translateX - 395, translateY + 110);
		ctx.rotate((Math.PI / 180) * tireSpin);
		ctx.drawImage(tirebImg, -tirebImg.width / 2, -tirebImg.height / 2, tirebImg.width, tirebImg.height);
		ctx.restore();

		//Cogs
		ctx.save();
		ctx.translate(translateX - 395, translateY + 115);
		ctx.rotate((Math.PI / 180) * cogSpin);
		ctx.drawImage(cogsImg, -cogsImg.width / 2, -cogsImg.height / 2, cogsImg.width, cogsImg.height);
		ctx.restore();

		//Front tire
		ctx.save();
		ctx.translate(translateX + 205, translateY + 110);
		ctx.rotate( 130 + (Math.PI / 180) * tireSpin) ;
		ctx.drawImage(tirefImg, -tirefImg.width / 2, -tirefImg.height / 2, tirefImg.width, tirefImg.height);
		ctx.restore();

		//Frame
		ctx.save();
		ctx.translate(translateX - 20, translateY + 0);
		ctx.drawImage(frameImg, -frameImg.width / 2, -frameImg.height / 2, frameImg.width, frameImg.height);
		ctx.restore();

		//Crank
		ctx.save();
		ctx.translate(translateX - 160, translateY + 130);
		ctx.rotate((((Math.PI * crankSpin) / 180)));
		ctx.drawImage(crankImg, -crankImg.width / 2 + 30, -crankImg.height / 2, crankImg.width, crankImg.height);
		ctx.restore();

		//Pedal
		ctx.save();
		var pedalAdjust = 90;//Adjust degrees for pedal
		ctx.translate(translateX - 160, translateY + 130);//Position in canvas,
		ctx.rotate((((Math.PI) / 180) * (crankSpin - pedalAdjust)));//rotate position around center axis
		ctx.translate(0, 100);//distance from axis center
		ctx.rotate(((Math.PI) / -180) * (crankSpin - pedalAdjust));//negative to lock rotation position
		ctx.drawImage(pedalImg, -pedalImg.width / 2, -pedalImg.height / 2, pedalImg.width, pedalImg.height);
		ctx.restore();

	ctx.restore();//General restore

	requestAnimationFrame(drawCanvas);//60 callbacks/s - depends on browser|display|background iframe
}

function sceneGenerator() {
	//Sky
	//Clouds

	//Sun || Moon

	//Road
	//Floor Texture
	//Rocks

	//Traffic Signs

	//Mountain

	//Animals

	//Trees

	//Grass

	//Beach

	//Other cyclists

	//Cars

	//Motorcycles
}

function printResults() {
	document.getElementById("show").innerHTML = gear+" Gear Ratio";
	document.getElementById("show2").innerHTML = KMh+" KM/h";
}

drawCanvas();
sceneGenerator();
printResults();
