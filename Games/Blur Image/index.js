
function clickImageHandler(evntObj)
{
	var imgEl = evntObj.target; // get reference from object 
	var name  = imgEl.id ;
	name 	  = name + ".JPG";
	imgEl.src = name;
	setTimeout(resetImage, 1000, imgEl);
}
function resetImage(imgEl)
{
	var name = imgEl.id;
	name     = name + "blur.JPG";
	imgEl.src = name;
}

function inite()
{
	var imgEl = document.getElementsByTagName("img");

	for( let i = 0 ; i < imgEl.length ; i++)
	imgEl[i].onmouseover = clickImageHandler;
var answer = [];
var minNumber = [0, 0];
var min = 0 ;  
var array = [12, -44, 598, -120, 123, -9, 7, 5, -3];
answer = array.filter( function(el){ return el >= 0 } );
console.log(answer);

for ( let i = 0 ; i < minNumber.length ; i++)
{
	min = answer[i];
	for( let j = i ; j < answer.length  ; j++)
	{
		if(answer[j] < min)
			min = answer[j];
	}
	console.log(min);
	let temp = min;
	answer[answer.indexOf(min)] = answer[i];
	answer[i] = min;
	minNumber[i] = min;
}
console.log(minNumber);


} 

window.onload = inite;
function filterasd(ele)
{
	return ele <= 10 ;
}