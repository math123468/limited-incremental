function reset() { 
	var game = {
		number:10,
		version:currentVer,
		activeTab:'gens',
		possibleUps:[1,2,3,4,5,6,12,13,14,15,16,23,24,25,26,34,35,36,45,46,56,123,124,125,126,134,135,136,145,146,156,234,235,236,245,246,256,345,346,356,456,1234,1235,1236,1245,1246,1256,1345,1346,1356,1456,2345,2346,2356,2456,3456,12345,12346,12356,12456,13456,23456,123456],
		upgrades1:[],
		upgrades2:[],
		upgrades3:[],
		upgrades4:[],
		upgrades5:[],
		upgrades6:[],
		synergies:[],
		gen1:{
			cost:10,
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:0,
			costInc:Math.pow(10,0.5)
		},
		gen2:{
			cost:100,
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:0,
			costInc:10
		},
		gen3:{
			cost:1e4,
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:0,
			costInc:Math.pow(10,1.5)
		},
		gen4:{
			cost:1e7,
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:0,
			costInc:Math.pow(10,2.5)
		},
		gen5:{
			cost:1e11,
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:0,
			costInc:1e4
		},
		gen6:{
			cost:1e16,
			baseMult:1,
			upgradeMult:1,
			synMult:1,
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
function updateClass(what,whatClass) {
	var element = document.getElementById(what)
	element.className = ''
	element.classList.add("button");
	element.classList.add(whatClass)
}
var game = reset()
var currentVer = 'v0.2B'
function init() {
	setInterval(tick,100)
	setInterval(save,3000)
	if(localStorage.getItem('limitedIncrementalSave')!=null) load(localStorage.getItem('limitedIncrementalSave'))
	update('commit','v0.1C-3')
}
function userImport() {
	var save = window.prompt('Paste your save data here.')
	load(save)
}
function userExport() {
	window.alert(localStorage.getItem("limitedIncrementalSave"))
}
function hardreset() {
	if(window.confirm('Are you sure you want to reset?') && window.confirm('This will reset all of your progress!!!') && window.confirm('You will gain no bonus from doing this')) {
		game = reset()
	}
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
function changeTab(tab) {
	hide('gens')
	hide('upgrades')
	hide('syn')
	hide('options')
	game.activeTab = tab
	show(tab)
}
function checkIfUpgradesUnlocked() {
	if(game.gen6.amt === 0) {
		show('upunlock')
		hide('tier1')
		hide('tier2')
		hide('tier3')
		hide('tier4')
		hide('tier5')
		hide('tier6')
		return
	}
	if(game.gen6.amt > 0) {
		show('upgrades')
		show('tier1')
		hide('upunlock')
		hide('tier2')
		hide('tier3')
		hide('tier4')
		hide('tier5')
		hide('tier6')
	}
	var good = 1
	for(i=1;i<7;i++) {
		if(!(game.upgrades1.includes(i))) good = 0
	}
	if(good === 1) {
		show('tier2')
	}
	good = 1
	for(i=1;i<7;i++) {
		for(j=1;j<7;j++) {
			if(j > i) {
				if(!(game.upgrades2.includes(String(10*i+j)))) good = 0
			}
		}
	}
	if(good === 1) {
		show('tier3')
	}
	good = 1
	for(i=1;i<7;i++) {
		for(j=1;j<7;j++) {
			for(k=1;k<7;k++) {
				if(j > i && k > j) {
					if(!(game.upgrades3.includes(String(100*i+10*j+k)))) good = 0
				}
			}
		}
	}
	if(good === 1) {
		show('tier4')
	}
	good = 1
	for(i=1;i<7;i++) {
		for(j=1;j<7;j++) {
			for(k=1;k<7;k++) {
				for(l=1;l<7;l++) {
					if(j > i && k > j && l > k) {
						if(!(game.upgrades4.includes(String(1000*i+100*j+10*k+l)))) good = 0
					}
				}
			}
		}
	}
	if(good === 1) {
		show('tier5')
	}
	good = 1
	for(i=1;i<7;i++) {
		for(j=1;j<7;j++) {
			for(k=1;k<7;k++) {
				for(l=1;l<7;l++) {
					for(m=1;m<7;m++) {
						if(j > i && k > j && l > k && m > l) {
							if(!(game.upgrades5.includes(String(10000*i+1000*j+100*k+10*l+m)))) good = 0
						}
					}
				}
			}
		}
	}
	if(good === 1) {
		show('tier6')
	}
	upgradeClasses()
}
function upgradeClasses() {
	for(i=0;i<game.possibleUps.length;i++) {
		var up = game.possibleUps[i]
		if(up < 10) {
			if(game.upgrades1.includes(up)) {
				updateClass('up'+up,'button')
			}
			else if(game.number >= returnUpgradeCost(up,1)) {
				updateClass('up'+up,'red')
			}
			else {
				updateClass('up'+up,'green')
			}
		}
		else {
			if(game['upgrades'+String(up).length].includes(String(up))) {
				updateClass('up' + up,'button')
			}
			else if(game.number >= returnUpgradeCost(up,String(up).length)) {
				updateClass('up'+up,'red')
			}
			else {
				updateClass('up'+up,'green')
			}
		}
	}
}
function checkIfSynergiesUnlocked() {
	if(game.gen6.amt < 15) {
		show('synunlock')
		hide('class1syn')
	}
	else {
		hide('synunlock')
		show('class1syn')
	}
}
function synergyClasses() {
	for(i=1;i<7;i++) {
		for(j=1;j<7;j++) {
			if(j > i) {
				var synNum = 10 * i + j
				if(game.synergies.includes(synNum)) updateClass('up'+up,'button')
				else if(game.number >= returnSynergyCost(synNum)) updateClass('up'+up,'red')
				else updateClass('up'+up,'green')
			}
		}
	}
}
function buyGen(i) {
	if(game.number >= game['gen'+i].cost) {
		game.number -= game['gen'+i].cost
		game['gen'+i].cost *= game['gen'+i].costInc
		game['gen'+i].baseMult *= 1.5
		if(game['gen'+i].cost >= 1e33) game['gen'+i].costInc *= Math.pow(10,0.25)
		game['gen'+i].amt ++
	}
}
function buyMax() {
	for(i=6;i>0;i--) {
		while(game.number >= game['gen'+i].cost) {
			buyGen(i)
		}
	}
}
function returnSynergyCost(synNum) {
	return 1e123 * Math.pow(10,[12,13,14,15,16,23,24,25,26,34,35,36,45,46,56].indexOf(synNum))
}
function buySyn(gen1,gen2) {
	var synNum = 10 * gen1 + gen2
	var cost = returnSynergyCost(synNum)
	if(game.number >= cost && !game.synergies.includes(synNum)) {
		game.number -= cost
		game.synergies.push(synNum)
	}
}
function returnUpgradeCost(num,tier) {
	if(tier === 1) return 1e21 * Math.pow(2,num-1)
	if(tier === 2) return [1e27,5e27,2.5e28,1.25e29,6.25e29,1e30,2e30,4e30,8e30,1.6e31][[12,13,14,15,16,23,24,25,26,34,35,36,45,46,56].indexOf(num)]
	if(tier === 3) return [1e51,3e51,9e51,2.7e52,8.1e52,2.43e53,1e54,3e54,9e54,2.7e55,8.1e55,2.43e56,1e57,3e57,9e57,2.7e58,8.1e58,2.43e59,2e60,3e60][[123,124,125,126,134,135,136,145,146,156,234,235,236,245,246,256,345,346,356,456].indexOf(num)]
	if(tier === 4) return [1e75,5e75,2.5e76,1.25e77,6.25e77,1e78,5e78,2.5e79,1.25e80,6.25e80,1e81,5e81,2.5e82,1.25e83,6.25e83][[1234,1235,1236,1245,1246,1256,1345,1346,1356,1456,2345,2346,2356,2456,3456].indexOf(num)]
	if(tier === 5) return [1e96,1e97,1e98,1e99,1e100,1e101][[12345,12346,12356,12456,13456,23456].indexOf(num)]
	return 1e108
}
function buyUp(num,tier) {
	if(tier === 1) {
		var cost = 1e21 * Math.pow(2,num-1)
		if(game.number >= cost && !game.upgrades1.includes(num)) {
			game['gen'+num].upgradeMult *= 2
			game.number -= cost
			game.upgrades1.push(num)
		}	
	}
	else if(tier === 2) {
		var pos = [12,13,14,15,16,23,24,25,26,34,35,36,45,46,56].indexOf(num)
		var cost = [1e27,5e27,2.5e28,1.25e29,6.25e29,1e30,5e30,2.5e31,1.25e32,6.25e32,1e33,2e33,4e33,8e33,1.6e34][pos]
		if(game.number >= cost && !game.upgrades2.includes(String(num))) {
			num = String(num)
			game['gen'+num[0]].upgradeMult *= 2
			game['gen'+num[1]].upgradeMult *= 2
			game.number -= cost
			game.upgrades2.push(num)
		}
	}
	else if(tier === 3) {
		var pos = [123,124,125,126,134,135,136,145,146,156,234,235,236,245,246,256,345,346,356,456].indexOf(num)
		var cost = [1e51,3e51,9e51,2.7e52,8.1e52,2.43e53,1e54,3e54,9e54,2.7e55,8.1e55,2.43e56,1e57,3e57,9e57,2.7e58,8.1e58,2.43e59,2e60,3e60][pos]
		if(game.number >= cost && !game.upgrades3.includes(String(num))) {
			num = String(num)
			game['gen'+num[0]].upgradeMult *= 2
			game['gen'+num[1]].upgradeMult *= 2
			game['gen'+num[2]].upgradeMult *= 2
			game.number -= cost
			game.upgrades3.push(num)
		}
	}
	else if(tier === 4) {
		var pos = [1234,1235,1236,1245,1246,1256,1345,1346,1356,1456,2345,2346,2356,2456,3456].indexOf(num)
		var cost = [1e75,5e75,2.5e76,1.25e77,6.25e77,1e78,5e78,2.5e79,1.25e80,6.25e80,1e81,5e81,2.5e82,1.25e83,6.25e83][pos]
		if(game.number >= cost && !game.upgrades4.includes(String(num))) {
			num = String(num)
			game['gen'+num[0]].upgradeMult *= 2
			game['gen'+num[1]].upgradeMult *= 2
			game['gen'+num[2]].upgradeMult *= 2
			game['gen'+num[3]].upgradeMult *= 2
			game.number -= cost
			game.upgrades4.push(num)
		}
	}
	else if(tier === 5) {
		var pos = [12345,12346,12356,12456,13456,23456].indexOf(num)
		var cost = [1e96,1e97,1e98,1e99,1e100,1e101][pos]
		if(game.number >= cost&& !game.upgrades5.includes(String(num))) {
			num = String(num)
			game['gen'+num[0]].upgradeMult *= 2
			game['gen'+num[1]].upgradeMult *= 2
			game['gen'+num[2]].upgradeMult *= 2
			game['gen'+num[3]].upgradeMult *= 2
			game['gen'+num[4]].upgradeMult *= 2
			game.number -= cost
			game.upgrades5.push(num)
		}
	}
	else if(tier === 6) {
		if(game.number >= 1e108&& !game.upgrades6.includes(String(num))) {
			game.number -= 1e108
			game.upgrades6.push(num)
			for(i=1;i<7;i++) {
				game['gen'+i].upgradeMult *= 2
			}
		}
	}
}
function increaseGens() {
	for(i=0;i<game.synergies.length;i++) {
		var gen1 = String(game.synergies[i])[0]
		var gen2 = String(game.synergies[i])[1]
		game['gen'+gen1].synMult = 1 + Math.log10(game['gen'+gen2].amt)
	}
	for(i=1;i<7;i++) {
		game['gen'+i].mult = game['gen'+i].baseMult * game['gen'+i].upgradeMult * game['gen'+i].synMult
	}
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
	if(game.activeTab === 'upgrades') checkIfUpgradesUnlocked()
	if(game.activeTab === 'syn') chackIfSynergiesUnlocked()
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
		if(game.activeTab === undefined) {
			game.activeTab = 'gens'
			game.possibleUps = [1,2,3,4,5,6,12,13,14,15,16,23,24,25,26,34,35,36,45,46,56,123,124,125,126,134,135,136,145,146,156,234,235,236,245,246,256,345,346,356,456,1234,1235,1236,1245,1246,1256,1345,1346,1356,1456,2345,2346,2356,2456,3456,12345,12346,12356,12456,13456,23456,123456]
		}
		if(game.version === undefined) game.version = currentVer
		if(game.synergies === undefined) game.synergies = []
		if(game.gen1.baseMult === undefined) {
			for(i=1;i<7;i++) {
				game['gen'+i].baseMult = 1
				game['gen'+i].upgradeMult = 1
			}
		}
		if(game.gen1.synMult === undefined) {
			for(i=1;i<7;i++) {
				game['gen'+i].synMult = 1
			}
		}
	} catch (e) {
		console.log('Your save failed to load: '+e)
	}
}
function loadBackup(point) {
}
