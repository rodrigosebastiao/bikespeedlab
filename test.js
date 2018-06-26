 function decrease(pos){
	
	
	pos--;
	
	return = pos;
}

function increase(pos){
	
	pos++;
	
	return pos;
}

var frontGear = decrease();

function frontDecrease(){
document.getElementById("fGearShow").innerHTML = frontGear.decrease(3);
}

function frontIncrease(){
document.getElementById("fGearShow").innerHTML = frontGear.increase(3);
}