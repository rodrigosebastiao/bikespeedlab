window.onload = function () {/*Initialize*/
	Update();
};

var menu = document.getElementById("menu");
menu.addEventListener("click", Update, true);


/********************
***GLOBAL VARIABLES**
*********************/

//(inch conversion use /2.54)
var gear = 0;
var distanceTrav = 0;
var KMh = 0;
var ms = 0;
var radiusRatio = 0;
var gainRatio = 0;
var tireRadius = 0;
var rpm = 0;
var crankLength = 0;
var tireCircumf = 0;
var show = document.getElementById("pedalRevolutions");

function Update() {
	gear = gearEngaged();
	rpm = parseFloat(document.getElementById("pedalRevolutions").value); //eg.: rpms 70, 120.
	crankLength = parseFloat((document.getElementById("crankLength").value)); //in mm
	tireCircumf = parseFloat(document.getElementById("tiresCirc").value); //in mm
	tireRadius = (tireCircumf / Math.PI) / 2; //tire radius
	//ganRatio = tire / crank size in
	radiusRatio = tireRadius / crankLength;
	gainRatio = radiusRatio * gear;
	distanceTrav = parseFloat((tireCircumf) / 100); //dist travelled by 1 wheel spin
	KMh = parseFloat(((distanceTrav * 360) / 1000).toFixed(2)); //Bike speed total in KM/h	
	ms = ((distanceTrav / 60)).toFixed(2);//Bike speed total in m/s
	show = document.getElementById("pedalRevolutions");
}


function gearEngaged() { //Ratio of gears and cogs and cranks teeth's sizes
	var currentGear = 0;
	var frontCranks = document.getElementsByClassName("chainring"); //Parent of leftShifter
	var rearCogs = document.getElementsByClassName("cog"); //Parent of rightShifter
	var leftShifter = parseFloat(document.getElementById("leftShifter").value); //input units
	var rightShifter = parseFloat(document.getElementById("rightShifter").value); //input units
	//Calculate front and rear positions
	var currentGear = parseFloat((frontCranks[leftShifter - 1].value / rearCogs[rightShifter - 1].value).toFixed(2)); 
	colorSlector(leftShifter, rightShifter); //gear color positions
	return currentGear;
}


function colorSlector(left, right) {
	var arrInputChainrings = document.getElementsByClassName("chainring");

	for (var i = 0; i < arrInputChainrings.length; i++) {/*clear all colors*/
		arrInputChainrings[i].style.background = "";
	}
	arrInputChainrings[left - 1].style.background = "#242B2A";/*set color*/

	//Break to cogs
	var arrInputCogs = document.getElementsByClassName("cog");

	for (var h = 0; h < arrInputCogs.length; h++) {/*clear all colors*/
		arrInputCogs[h].style.background = "";
	}
	arrInputCogs[right - 1].style.background = "#242B2A";/*set color*/
}

function start() {
	gainRatio;
}

function stop() {
	gainRatio = 0;
}

function startStop(){

}

var speed = 0;
var crankSpin = 0;
var tireSpin = 0;
var cogSpin = 0;
	
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var posX = 100;//translate global;
var posY = 0;//translate global;
var bsize = 0.8;

function Bike() {
	var translateX = canvas.width / 2; //translate images
	var translateY = canvas.height / 2;//translate images
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
	
	crankSpin += gainRatio;
	
	tireSpin += gainRatio;
	cogSpin += gainRatio;

	ctx.save();//General save
		ctx.translate(posX, posY);//canvas elements position
		//Back tire
		ctx.save();
			ctx.translate(translateX - 395, translateY + 110);
			ctx.rotate(tireSpin * Math.PI / 180);
			ctx.drawImage(tirebImg, (-tirebImg.width / 2), (-tirebImg.height / 2), tirebImg.width,
			tirebImg.height);
		ctx.restore();

		//Cogs
		ctx.save();
			ctx.translate(translateX - 395, translateY + 115);
			ctx.rotate(cogSpin * Math.PI / 180);
			ctx.drawImage(cogsImg, (-cogsImg.width / 2), (-cogsImg.height / 2), cogsImg.width, cogsImg.height);
		ctx.restore();

		//Front tire
		ctx.save();
			ctx.translate(translateX + 185, translateY + 110);
			ctx.rotate((tireSpin * Math.PI / 180) + 130);
			ctx.drawImage(tirefImg,  -tirefImg.width / 2,  -tirefImg.height / 2, tirefImg.width, tirefImg.height);
		ctx.restore();

		//Frame
		ctx.save();
			ctx.translate(translateX - 25, translateY - 10);
			ctx.drawImage(frameImg, -frameImg.width / 2, -frameImg.height / 2, frameImg.width, frameImg.height);
		ctx.restore();

		//Crank
		ctx.save();
			ctx.translate(translateX - 160, translateY + 130);
			ctx.rotate((crankSpin * Math.PI / 180));
			ctx.drawImage(crankImg, -crankImg.width / 2 + 30, -crankImg.height / 2, crankImg.width, crankImg.height);
		ctx.restore();

		//Pedal
		ctx.save();
			var pedalAdjust = 90;//Adjust degrees for pedal
			ctx.translate(translateX - 160, translateY + 130);//Position in canvas,
			ctx.rotate((crankSpin - pedalAdjust) * Math.PI / 180);//rotate position around center axis
			ctx.translate(0, 100);//distance from axis center
			ctx.rotate((crankSpin - pedalAdjust) * Math.PI / -180);//negative to lock rotation position
			ctx.drawImage(pedalImg, -pedalImg.width / 2, -pedalImg.height / 2, pedalImg.width, pedalImg.height);
		ctx.restore();
	ctx.restore();//General restore
}

var sceneX = 2;
var sceneY = 2;
var scenePosX = 100;
var scenePosY = 100;
var moveScene = 0;

function sceneGenerator() {
	var land1 = new Image();
	land1.src = "images/road1s.png";

	ctx.save();
		ctx.translate(scenePosX + moveScene, scenePosY);
		ctx.drawImage(land1, -land1.width / 2, -land1.height / 2, sceneX * land1.width, sceneY * land1.height);
	moveScene -= gainRatio;
		
		if(moveScene < -land1.width){
			moveScene = 0;
		}
	ctx.restore();
	
	//ctx.translate(posX,posY);

	
	//Sky
	//Clouds

	//Sun || Moon
		ctx.save();
		ctx.restore();
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


function drawCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	sceneGenerator();
	Bike();
	printResults();
	requestAnimationFrame(drawCanvas);//60 callbacks/s - depends on browser|display|background iframe
}

function printResults() {
	document.getElementById("show").innerHTML = gear+" Gear Ratio";
	document.getElementById("show2").innerHTML = KMh+" KM/h";
}

drawCanvas();

