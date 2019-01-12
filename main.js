function reset() { 
	var game = {
		number:10,
		gen1:{
			cost:10,
			mult:1,
			amt:0,
			costInc:Math.pow(10,0.25)
		},
		gen2:{
			cost:1000,
			mult:1,
			amt:0,
			costInc:Math.pow(10,0.5)
		},
		gen3:{
			cost:1e5,
			mult:1,
			amt:0,
			costInc:Math.pow(10,0.75)
		},
		gen4:{
			cost:1e8,
			mult:1,
			amt:0,
			costInc:Math.pow(10,1.25)
		},
		gen5:{
			cost:1e12,
			mult:1,
			amt:0,
			costInc:100
		},
		gen6:{
			cost:1e17,
			mult:1,
			amt:0,
			costInc:Math.pow(10,3.25)
		},
	}
	return game
}
function update(what,withWhat) {
	document.getElementById(what).innerHTML = withWhat
}
var game = reset()
function init() {
	setInterval(tick,100)
	setInterval(save,30000)
	if(localStorage.getItem('save')!=null) load(localStorage.getItem('save'))
}
function displayUpdate() {
	update('num',format(game.number))
	for(i=1;i<7;i++) {
		update(i+'amt',format(game['gen'+i].amt))
		if(i!=6) {
			update(i+'persec',format(game['gen'+(i+1)].amt * game['gen'+(i+1)].mult))
		}
		update('mult'+i,format(game['gen'+i].mult))
		update('cost'+i,format(game['gen'+i].cost))
	}
}
function buyGen(i) {
	if(game.number >= game['gen'+i].cost) {
		game.number -= game['gen'+i].cost
		game['gen'+i].cost *= game['gen'+i].costInc
		game['gen'+i].mult *= 1.1
		game['gen'+i].amt ++
	}
}
function abbreviate(i,short) {
	if(short) {
		if(i==0) return "K"; // thousand
		if(i==1) return "M"; // million
		if(i==2) return "B"; // billion
		if(i==8) return "Oc";
		if(i==9) return "No";
	}
	var returning = ''
	var units = ["","U","D","T","Qd","Qt","Sx","Sp","O","N"]; // prefixes for ones place
	var tens = ["","Dc","Vg","Tg","Qa","Qi","Se","St","Og","Nn"]; // prefixes for tens place
	var hundreds = ["","Ce","Dn","Tc","Qe","Qu","Sc","Si","Oe","Ne"]
	var thousands = ['','MI-','MC-','NA-']
	var i2=Math.floor(i/10);
	var i3=Math.floor(i2/10);
	var unit = units[i%10];
	var ten = tens[i2%10];
	var hundred = hundreds[i3%10];
	returning = unit+ten+hundred
	for(j=Math.floor(Math.log(i)/Math.log(1000));j>0;j--) {
		var k = Math.floor(i/Math.pow(1000,j)) % 1000
		if(k === 1) {
			returning = thousands[j] + returning
			continue
		}
		var blah = thousands[j]
		returning = abbreviate(k,false) + blah + returning
	}
	return returning;
}
function format(num) {
	if(num <= 1000) {
		return Math.round(num * 10000)/10000
	}
	var e = Math.floor(Math.log10(num));
	var e2 = 3*Math.floor(e/3)
	var m = Math.round(Math.pow(10,Math.log10(num)-e)*1000)/1000;
	if (m>9.9995) { // would round up to 10; this avoids a problem
		m = 1;
		e++;
	}
	return Math.round(1000*m*Math.pow(10,e-e2))/1000+abbreviate(e2/3-1,true)
}
function tick() {
	game.number += game.gen1.amt * game.gen1.mult / 10
	game.gen1.amt += game.gen2.amt * game.gen2.mult / 10
	game.gen2.amt += game.gen3.amt * game.gen3.mult / 10
	game.gen3.amt += game.gen4.amt * game.gen4.mult / 10
	game.gen4.amt += game.gen5.amt * game.gen5.mult / 10
	game.gen5.amt += game.gen6.amt * game.gen6.mult / 10
	displayUpdate()
}
function save() { //save game
	localStorage.setItem('save',btoa(JSON.stringify(game)))
}
function load(save) {
	try {
		game=JSON.parse(atob(save))
	} catch (e) {
		console.log('Your save failed to load: '+e)
	}
}
