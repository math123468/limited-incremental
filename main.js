function reset() { 
	var game = {
		number:10,
		upgrades1:[],
		upgrades2:[],
		upgrades3:[],
		upgrades4:[],
		upgrades5:[],
		upgrades6:[],
		gen1:{
			cost:10,
			mult:1,
			amt:0,
			costInc:Math.pow(10,0.5)
		},
		gen2:{
			cost:100,
			mult:1,
			amt:0,
			costInc:10
		},
		gen3:{
			cost:1e4,
			mult:1,
			amt:0,
			costInc:Math.pow(10,1.5)
		},
		gen4:{
			cost:1e7,
			mult:1,
			amt:0,
			costInc:Math.pow(10,2.5)
		},
		gen5:{
			cost:1e11,
			mult:1,
			amt:0,
			costInc:1e4
		},
		gen6:{
			cost:1e16,
			mult:1,
			amt:0,
			costInc:Math.pow(10,6.5)
		},
	}
	return game
}
function update(what,withWhat) {
	document.getElementById(what).innerHTML = withWhat
}
function hide(what) {
	document.getElementById(what).style.display = 'none'
}
function show(what) {
	document.getElementById(what).style.display = 'block'
}
var game = reset()
function init() {
	setInterval(tick,100)
	setInterval(save,3000)
	if(localStorage.getItem('limitedIncrementalSave')!=null) load(localStorage.getItem('limitedIncrementalSave'))
}
function displayUpdate() {
	update('num',format(game.number,0))
	for(i=1;i<7;i++) {
		update(i+'amt',format(game['gen'+i].amt,0))
		if(i!=6) {
			update(i+'persec',format(game['gen'+(i+1)].amt * game['gen'+(i+1)].mult,2))
		}
		update('mult'+i,format(game['gen'+i].mult,4))
		update('cost'+i,format(game['gen'+i].cost,0))
	}
}
function checkIfUpgradesUnlocked() {
	if(game.gen6.amt > 0) {
		show('upgrades')
		hide('tier2')
		for(i=0;i<game.upgrades1.length;i++) {
			hide('up'+game.upgrades1[i])
		}
	}
	var good = 1
	for(i=0;i<6;i++) {
		if(!(game.upgrades1.includes(i))) good = 0
	}
	if(good === 1) {
		show('tier2')
		for(i=0;i<game.upgrades2.length;i++) {
			hide('up'+game.upgrades2[i])
		}
	}
}
function buyGen(i) {
	if(game.number >= game['gen'+i].cost) {
		game.number -= game['gen'+i].cost
		game['gen'+i].cost *= game['gen'+i].costInc
		game['gen'+i].mult *= 1.5
		game['gen'+i].amt ++
	}
}
function buyUp(num,tier) {
	if(tier === 1) {
		if(game.number >= 1e21) {
			game['gen'+num].mult *= 2
			game.number -= 1e21
			game.upgrades1.push(num)
		}	
	}
	else if(tier === 2) {
		if(game.number >= 1e27) {
			num = String(num)
			game['gen'+num[0]].mult *= 2
			game['gen'+num[1]].mult *= 2
			game.number -= 1e27
			game.upgrades2.push(num)
		}
	}
}
function increaseGens() {
	game.number += game.gen1.amt * game.gen1.mult / 10
	game.gen1.amt += game.gen2.amt * game.gen2.mult / 10
	game.gen2.amt += game.gen3.amt * game.gen3.mult / 10
	game.gen3.amt += game.gen4.amt * game.gen4.mult / 10
	game.gen4.amt += game.gen5.amt * game.gen5.mult / 10
	game.gen5.amt += game.gen6.amt * game.gen6.mult / 10
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
function format(num,decimals) {
	if(num <= 1000) {
		return Math.round(num * Math.pow(10,decimals))/Math.pow(10,decimals)
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
	increaseGens()
	displayUpdate()
	checkIfUpgradesUnlocked()
}
function save() { //save game
	localStorage.setItem('limitedIncrementalSave',btoa(JSON.stringify(game)))
}
function load(save) {
	try {
		game=JSON.parse(atob(save))
		if(game.upgrades1 === undefined) {
			game.upgrades1 = []
			game.upgrades2 = []
			game.upgrades3 = []
			game.upgrades4 = []
			game.upgrades5 = []
			game.upgrades6 = []
		}
	} catch (e) {
		console.log('Your save failed to load: '+e)
	}
}
