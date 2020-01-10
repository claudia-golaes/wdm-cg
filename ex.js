var prenume = prompt('Prenume?');
var nume = prompt('Nume de familie?');
var varsta = prompt('Varsta?');
var inaltime = prompt('Inaltime in cm?');
var fecioara = prompt('Numele de fecioara al mamei tale?');

alert('Ctrl+Shift+I frate');



if(prenume[0] === nume[0]){
	if( varsta > 15 && varsta < 25){
		if(inaltime >= 180){
			if(fecioara[fecioara.length - 1] === 'a'){
				console.log('In sfarsit un exercitiu fara Dinamo!');

			} else{
				console.log('Nu mai faceti glume cu Dinamo va rog.');
			}
		} else{
			console.log('Nu mai faceti glume cu Dinamo va rog.');
		}
	} else{
		console.log('Nu mai faceti glume cu Dinamo va rog.');
	}
} else{
	console.log('Nu mai faceti glume cu Dinamo va rog.');
}



