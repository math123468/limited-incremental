function reset() { 
	var game = {
		number:10,
		version:currentVer,
		activeTab:'gens',
		timePlayed:0,
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
		negative:{
			cost:10,
			upgrades:[],
			amt:0,
		}
	}
	return game
}
const news = ['Hi, guys!']
const newsTimes = [2]
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
function changeNews() {
	var nextNewsNum = Math.floor(news.length * Math.random())
	update('news',news[nextNewsNum])
	setInterval('changeNews()',newsTimes[nextNewsNum] * 1000)
}
var game = reset()
var currentVer = 'v0.1D'
function init() {
	setInterval(tick,100)
	setInterval(save,3000)
	if(localStorage.getItem('limitedIncrementalSave')!=null) load(localStorage.getItem('limitedIncrementalSave'))
	update('commit','v0.1D-18')
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
	hide('negative')
	hide('options')
	hide('achievs')
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
	if(game.gen6.amt < 14) {
		show('synunlock')
		hide('class1syn')
	}
	else {
		hide('synunlock')
		show('class1syn')
	}
	synergyClasses()
}
function checkIfNegativesUnlocked() {
	if(game.gen6.amt < 6666) {
		show('negunlock')
		hide('neg1')
	}
	else {
		hide('negunlock')
		show('neg1')
	}
}
function synergyClasses() {
	for(i=1;i<7;i++) {
		for(j=1;j<7;j++) {
			if(j > i) {
				var synNum = 10 * i + j
				if(game.synergies.includes(synNum)) updateClass('syn'+synNum,'button')
				else if(game.number >= returnSynergyCost(synNum)) updateClass('syn'+synNum,'red')
				else updateClass('syn'+synNum,'green')
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
		game.gen1.costInc = Math.min(game.gen1.costInc,1e4)
		game.gen2.costInc = Math.min(game.gen2.costInc,Math.pow(10,4.5))
		game.gen3.costInc = Math.min(game.gen3.costInc,1e5)
		game.gen4.costInc = Math.min(game.gen4.costInc,Math.pow(10,5.5))
		game.gen5.costInc = Math.min(game.gen5.costInc,1e6)
		game.gen6.costInc = Math.min(game.gen6.costInc,1e7)
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
	return 1e111 * Math.pow(10,[12,13,14,15,16,23,24,25,26,34,35,36,45,46,56].indexOf(synNum))
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
	if(tier === 2) return [1e27,5e27,2.5e28,1.25e29,6.25e29,1e30,5e30,2.5e31,1.25e32,6.25e32,1e33,2e33,4e33,8e33,1.6e34][[12,13,14,15,16,23,24,25,26,34,35,36,45,46,56].indexOf(num)]
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
		if(game.number >= 1e108&& !game.upgrades6.includes(num)) {
			game.number -= 1e108
			game.upgrades6.push(String(num))
			for(i=1;i<7;i++) {
				game['gen'+i].upgradeMult *= 2
			}
		}
	}
}
function increaseGens() {
	for(i=0;i<7;i++) {
		game['gen'+i].synMult = 1
	}
	for(i=0;i<game.synergies.length;i++) {
		var gen1 = String(game.synergies[i])[0]
		var gen2 = String(game.synergies[i])[1]
		game['gen'+gen1].synMult *= 1 + Math.log10(game['gen'+gen2].amt)
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
	game.timePlayed += 0.1
	increaseGens()
	displayUpdate()
	if(game.activeTab === 'upgrades') checkIfUpgradesUnlocked()
	if(game.activeTab === 'syn') checkIfSynergiesUnlocked()
	if(game.activeTab === 'negative') checkIfNegativesUnlocked()
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
		if(game.negative === undefined) game.negative = reset().negative
	} catch (e) {
		console.log('Your save failed to load: '+e)
	}
}
function loadBackup(point) {
	if(point === 'presyn') load("eyJudW1iZXIiOjcuMTIxNDA3NzQwMzI2NDY3ZSsxMTQsImFjdGl2ZVRhYiI6ImdlbnMiLCJwb3NzaWJsZVVwcyI6WzEsMiwzLDQsNSw2LDEyLDEzLDE0LDE1LDE2LDIzLDI0LDI1LDI2LDM0LDM1LDM2LDQ1LDQ2LDU2LDEyMywxMjQsMTI1LDEyNiwxMzQsMTM1LDEzNiwxNDUsMTQ2LDE1NiwyMzQsMjM1LDIzNiwyNDUsMjQ2LDI1NiwzNDUsMzQ2LDM1Niw0NTYsMTIzNCwxMjM1LDEyMzYsMTI0NSwxMjQ2LDEyNTYsMTM0NSwxMzQ2LDEzNTYsMTQ1NiwyMzQ1LDIzNDYsMjM1NiwyNDU2LDM0NTYsMTIzNDUsMTIzNDYsMTIzNTYsMTI0NTYsMTM0NTYsMjM0NTYsMTIzNDU2XSwidXBncmFkZXMxIjpbMSwyLDMsNCw1LDZdLCJ1cGdyYWRlczIiOlsiMTIiLCIxMyIsIjE0IiwiMTUiLCIxNiIsIjIzIiwiMjQiLCIyNSIsIjI2IiwiMzYiLCI1NiIsIjM1IiwiNDYiLCIzNCIsIjQ1Il0sInVwZ3JhZGVzMyI6WyIxMjMiLCIxMjQiLCIxMjUiLCIxMjYiLCIxMzQiLCIxMzUiLCIxMzYiLCIxNDUiLCIxNDYiLCIxNTYiLCIyMzQiLCIyMzUiLCIyMzYiLCIyNDUiLCIyNDYiLCIyNTYiLCIzNDUiLCIzNDYiLCIzNTYiLCI0NTYiXSwidXBncmFkZXM0IjpbIjEyMzQiLCIxMjM1IiwiMTIzNiIsIjEyNDUiLCIxMjQ2IiwiMTI1NiIsIjEzNDUiLCIxNDU2IiwiMjM0NSIsIjEzNDYiLCIxMzU2IiwiMjM0NiIsIjIzNTYiLCIyNDU2IiwiMzQ1NiJdLCJ1cGdyYWRlczUiOlsiMTIzNDUiLCIxMjM0NiIsIjEyMzU2IiwiMTI0NTYiLCIxMzQ1NiIsIjIzNDU2Il0sInVwZ3JhZGVzNiI6WzEyMzQ1Nl0sInN5bmVyZ2llcyI6W10sImdlbjEiOnsiY29zdCI6MS4wMDAwMDAwMDAwMDAwMDA0ZSsxMjAsImJhc2VNdWx0IjozMTMzNTA3OTIxMjYzNTg3LCJ1cGdyYWRlTXVsdCI6NDI5NDk2NzI5Niwic3luTXVsdCI6MSwibXVsdCI6MS4zNDU4MzE0MDQzNTg0MDVlKzI1LCJhbXQiOjguMzEzNDEwNDEyOTk1NjY0ZSs4NywiY29zdEluYyI6NTYyMzQxMy4yNTE5MDM0ODh9LCJnZW4yIjp7ImNvc3QiOjEuNzc4Mjc5NDEwMDM4OTE1M2UrMTE4LCJiYXNlTXVsdCI6MjE1MTk3MjU2My4yMjI0MTc0LCJ1cGdyYWRlTXVsdCI6NDI5NDk2NzI5Niwic3luTXVsdCI6MSwibXVsdCI6OTI0MjY1MTc4MDkyOTU3NTAwMCwiYW10Ijo4Ljc1NTM3MDQ1NTE2MTg0NWUrNjYsImNvc3RJbmMiOjU2MjM0MTMuMjUxOTAzNDg4fSwiZ2VuMyI6eyJjb3N0IjozLjE2MjI3NzY2MDE2ODM2NjRlKzExNiwiYmFzZU11bHQiOjExMDU3MzMyLjMyMDk0MDAxMiwidXBncmFkZU11bHQiOjQyOTQ5NjcyOTYsInN5bk11bHQiOjEsIm11bHQiOjQ3NDkwODgwNjk5NDQxMTMwLCJhbXQiOjEuNDIxNzQ3ODQ0MzMxNzU1NWUrNDgsImNvc3RJbmMiOjU2MjM0MTMuMjUxOTAzNDg4fSwiZ2VuNCI6eyJjb3N0IjoxLjc3ODI3OTQxMDAzODkxMjllKzExNSwiYmFzZU11bHQiOjg1MjIyLjY5Mjk5MjM5MjkzLCJ1cGdyYWRlTXVsdCI6NDI5NDk2NzI5Niwic3luTXVsdCI6MSwibXVsdCI6MzY2MDI4Njc5Mjc5Mzc2LCJhbXQiOjIuMjU2NDY3MDk1NDIyMTM5NmUrMzEsImNvc3RJbmMiOjk5OTk5OTkuOTk5OTk5OTk0fSwiZ2VuNSI6eyJjb3N0IjoxLjc3ODI3OTQxMDAzODkxMzdlKzExNywiYmFzZU11bHQiOjMzMjUuMjU2NzMwMDc5NjUxLCJ1cGdyYWRlTXVsdCI6NDI5NDk2NzI5Niwic3luTXVsdCI6MSwibXVsdCI6MTQyODE4Njg5MDY0OTYsImFtdCI6NjQ3NjU2NDQ2MTk2NDU1NCwiY29zdEluYyI6NTYyMzQxMzIuNTE5MDM0ODd9LCJnZW42Ijp7ImNvc3QiOjMuMTYyMjc3NjYwMTY4Mzc2NmUrMTIzLCJiYXNlTXVsdCI6MjkxLjkyOTI2MDI1MzkwNjI1LCJ1cGdyYWRlTXVsdCI6NDI5NDk2NzI5Niwic3luTXVsdCI6MSwibXVsdCI6MTI1MzgyNjYyNTUzNiwiYW10IjoxNCwiY29zdEluYyI6MzE2MjI3NzY2MC4xNjgzNzg0fSwidmVyc2lvbiI6InYwLjJCIn0=")
	if(point === 'postupg') load("eyJudW1iZXIiOjkuMjkyMjU3OTAyOTY3NDA3ZSsxMTEsImFjdGl2ZVRhYiI6InVwZ3JhZGVzIiwicG9zc2libGVVcHMiOlsxLDIsMyw0LDUsNiwxMiwxMywxNCwxNSwxNiwyMywyNCwyNSwyNiwzNCwzNSwzNiw0NSw0Niw1NiwxMjMsMTI0LDEyNSwxMjYsMTM0LDEzNSwxMzYsMTQ1LDE0NiwxNTYsMjM0LDIzNSwyMzYsMjQ1LDI0NiwyNTYsMzQ1LDM0NiwzNTYsNDU2LDEyMzQsMTIzNSwxMjM2LDEyNDUsMTI0NiwxMjU2LDEzNDUsMTM0NiwxMzU2LDE0NTYsMjM0NSwyMzQ2LDIzNTYsMjQ1NiwzNDU2LDEyMzQ1LDEyMzQ2LDEyMzU2LDEyNDU2LDEzNDU2LDIzNDU2LDEyMzQ1Nl0sInVwZ3JhZGVzMSI6WzEsMiwzLDQsNSw2XSwidXBncmFkZXMyIjpbIjEyIiwiMTMiLCIxNCIsIjE1IiwiMTYiLCIyMyIsIjI0IiwiMjUiLCIyNiIsIjM2IiwiNTYiLCIzNSIsIjQ2IiwiMzQiLCI0NSJdLCJ1cGdyYWRlczMiOlsiMTIzIiwiMTI0IiwiMTI1IiwiMTI2IiwiMTM0IiwiMTM1IiwiMTM2IiwiMTQ1IiwiMTQ2IiwiMTU2IiwiMjM0IiwiMjM1IiwiMjM2IiwiMjQ1IiwiMjQ2IiwiMjU2IiwiMzQ1IiwiMzQ2IiwiMzU2IiwiNDU2Il0sInVwZ3JhZGVzNCI6WyIxMjM0IiwiMTIzNSIsIjEyMzYiLCIxMjQ1IiwiMTI0NiIsIjEyNTYiLCIxMzQ1IiwiMTQ1NiIsIjIzNDUiLCIxMzQ2IiwiMTM1NiIsIjIzNDYiLCIyMzU2IiwiMjQ1NiIsIjM0NTYiXSwidXBncmFkZXM1IjpbIjEyMzQ1IiwiMTIzNDYiLCIxMjM1NiIsIjEyNDU2IiwiMTM0NTYiLCIyMzQ1NiJdLCJ1cGdyYWRlczYiOlsxMjM0NTZdLCJzeW5lcmdpZXMiOltdLCJnZW4xIjp7ImNvc3QiOjMuMTYyMjc3NjYwMTY4MzgxNmUrMTEzLCJiYXNlTXVsdCI6MjA4OTAwNTI4MDg0MjM5MS41LCJ1cGdyYWRlTXVsdCI6NDI5NDk2NzI5Niwic3luTXVsdCI6MSwibXVsdCI6OC45NzIyMDkzNjIzODkzNjdlKzI0LCJhbXQiOjMuMzc2NDQzMDM1NDkwMjYzNWUrODUsImNvc3RJbmMiOjMxNjIyNzcuNjYwMTY4Mzc4fSwiZ2VuMiI6eyJjb3N0Ijo1LjYyMzQxMzI1MTkwMzQ2OWUrMTExLCJiYXNlTXVsdCI6MTQzNDY0ODM3NS40ODE2MTE1LCJ1cGdyYWRlTXVsdCI6NDI5NDk2NzI5Niwic3luTXVsdCI6MSwibXVsdCI6NjE2MTc2Nzg1Mzk1MzA1MDAwMCwiYW10IjoxLjUwNTQ4MzM5MTMwMTc0NWUrNjUsImNvc3RJbmMiOjMxNjIyNzcuNjYwMTY4Mzc4fSwiZ2VuMyI6eyJjb3N0IjozLjE2MjI3NzY2MDE2ODM2NjRlKzExNiwiYmFzZU11bHQiOjExMDU3MzMyLjMyMDk0MDAxMiwidXBncmFkZU11bHQiOjQyOTQ5NjcyOTYsInN5bk11bHQiOjEsIm11bHQiOjQ3NDkwODgwNjk5NDQxMTMwLCJhbXQiOjcuMDE4MDU1NDcxNjA2MjMzZSs0NiwiY29zdEluYyI6NTYyMzQxMy4yNTE5MDM0ODh9LCJnZW40Ijp7ImNvc3QiOjEuNzc4Mjc5NDEwMDM4OTEyOWUrMTE1LCJiYXNlTXVsdCI6ODUyMjIuNjkyOTkyMzkyOTMsInVwZ3JhZGVNdWx0Ijo0Mjk0OTY3Mjk2LCJzeW5NdWx0IjoxLCJtdWx0IjozNjYwMjg2NzkyNzkzNzYsImFtdCI6My4xMzIwMjAyMDAwNDY1MDRlKzMwLCJjb3N0SW5jIjo5OTk5OTk5Ljk5OTk5OTk5NH0sImdlbjUiOnsiY29zdCI6MS43NzgyNzk0MTAwMzg5MTM3ZSsxMTcsImJhc2VNdWx0IjozMzI1LjI1NjczMDA3OTY1MSwidXBncmFkZU11bHQiOjQyOTQ5NjcyOTYsInN5bk11bHQiOjEsIm11bHQiOjE0MjgxODY4OTA2NDk2LCJhbXQiOjIyOTQ2MzQ3MjM1OTQzMjQsImNvc3RJbmMiOjU2MjM0MTMyLjUxOTAzNDg3fSwiZ2VuNiI6eyJjb3N0IjoxLjc3ODI3OTQxMDAzODkyMmUrMTE0LCJiYXNlTXVsdCI6MTk0LjYxOTUwNjgzNTkzNzUsInVwZ3JhZGVNdWx0Ijo0Mjk0OTY3Mjk2LCJzeW5NdWx0IjoxLCJtdWx0Ijo4MzU4ODQ0MTcwMjQsImFtdCI6MTMsImNvc3RJbmMiOjE3NzgyNzk0MTAuMDM4OTIyM30sInZlcnNpb24iOiJ2MC4yQiJ9")
	if(point === 'tier5') load("eyJudW1iZXIiOjIuMDM2ODgzMjAwMDUxNjgxNWUrMTAzLCJhY3RpdmVUYWIiOiJnZW5zIiwicG9zc2libGVVcHMiOlsxLDIsMyw0LDUsNiwxMiwxMywxNCwxNSwxNiwyMywyNCwyNSwyNiwzNCwzNSwzNiw0NSw0Niw1NiwxMjMsMTI0LDEyNSwxMjYsMTM0LDEzNSwxMzYsMTQ1LDE0NiwxNTYsMjM0LDIzNSwyMzYsMjQ1LDI0NiwyNTYsMzQ1LDM0NiwzNTYsNDU2LDEyMzQsMTIzNSwxMjM2LDEyNDUsMTI0NiwxMjU2LDEzNDUsMTM0NiwxMzU2LDE0NTYsMjM0NSwyMzQ2LDIzNTYsMjQ1NiwzNDU2LDEyMzQ1LDEyMzQ2LDEyMzU2LDEyNDU2LDEzNDU2LDIzNDU2LDEyMzQ1Nl0sInVwZ3JhZGVzMSI6WzEsMiwzLDQsNSw2XSwidXBncmFkZXMyIjpbIjEyIiwiMTMiLCIxNCIsIjE1IiwiMTYiLCIyMyIsIjI0IiwiMjUiLCIyNiIsIjM2IiwiNTYiLCIzNSIsIjQ2IiwiMzQiLCI0NSJdLCJ1cGdyYWRlczMiOlsiMTIzIiwiMTI0IiwiMTI1IiwiMTI2IiwiMTM0IiwiMTM1IiwiMTM2IiwiMTQ1IiwiMTQ2IiwiMTU2IiwiMjM0IiwiMjM1IiwiMjM2IiwiMjQ1IiwiMjQ2IiwiMjU2IiwiMzQ1IiwiMzQ2IiwiMzU2IiwiNDU2Il0sInVwZ3JhZGVzNCI6WyIxMjM0IiwiMTIzNSIsIjEyMzYiLCIxMjQ1IiwiMTI0NiIsIjEyNTYiLCIxMzQ1IiwiMTQ1NiIsIjIzNDUiLCIxMzQ2IiwiMTM1NiIsIjIzNDYiLCIyMzU2IiwiMjQ1NiIsIjM0NTYiXSwidXBncmFkZXM1IjpbIjEyMzQ1IiwiMTIzNDYiLCIxMjM1NiIsIjEyNDU2IiwiMTM0NTYiLCIyMzQ1NiJdLCJ1cGdyYWRlczYiOltdLCJzeW5lcmdpZXMiOltdLCJnZW4xIjp7ImNvc3QiOjEuNzc4Mjc5NDEwMDM4OTI1ZSsxMDcsImJhc2VNdWx0IjoxMzkyNjcwMTg3MjI4MjYxLCJ1cGdyYWRlTXVsdCI6MjE0NzQ4MzY0OCwic3luTXVsdCI6MSwibXVsdCI6Mi45OTA3MzY0NTQxMjk3ODllKzI0LCJhbXQiOjIuMDQ4NzMzNTkyNjkwMzQ2ZSs3OCwiY29zdEluYyI6MTc3ODI3OS40MTAwMzg5MjIyfSwiZ2VuMiI6eyJjb3N0IjozLjE2MjI3NzY2MDE2ODM2ODVlKzEwNSwiYmFzZU11bHQiOjk1NjQzMjI1MC4zMjEwNzQ0LCJ1cGdyYWRlTXVsdCI6MjE0NzQ4MzY0OCwic3luTXVsdCI6MSwibXVsdCI6MjA1MzkyMjYxNzk4NDM1MDAwMCwiYW10IjoyLjExMzc3NjYxMjI1Mjg1OGUrNTksImNvc3RJbmMiOjE3NzgyNzkuNDEwMDM4OTIyMn0sImdlbjMiOnsiY29zdCI6NS42MjM0MTMyNTE5MDM0NzFlKzEwMywiYmFzZU11bHQiOjQ5MTQzNjkuOTIwNDE3NzgzLCJ1cGdyYWRlTXVsdCI6MjE0NzQ4MzY0OCwic3luTXVsdCI6MSwibXVsdCI6MTA1NTM1MjkwNDQzMjAyNTAsImFtdCI6My41MTQ1MTM2NjU0MTA2NzRlKzQyLCJjb3N0SW5jIjoxNzc4Mjc5LjQxMDAzODkyMjJ9LCJnZW40Ijp7ImNvc3QiOjMuMTYyMjc3NjYwMTY4MzYzZSsxMDgsImJhc2VNdWx0Ijo1NjgxNS4xMjg2NjE1OTUyODUsInVwZ3JhZGVNdWx0IjoyMTQ3NDgzNjQ4LCJzeW5NdWx0IjoxLCJtdWx0IjoxMjIwMDk1NTk3NTk3OTIsImFtdCI6NC4wMzk1NjkwNDkzNjUzMzFlKzI3LCJjb3N0SW5jIjo1NjIzNDEzLjI1MTkwMzQ4OH0sImdlbjUiOnsiY29zdCI6NS42MjM0MTMyNTE5MDM0NjZlKzEwOSwiYmFzZU11bHQiOjIyMTYuODM3ODIwMDUzMTAwNiwidXBncmFkZU11bHQiOjIxNDc0ODM2NDgsInN5bk11bHQiOjEsIm11bHQiOjQ3NjA2MjI5Njg4MzIsImFtdCI6ODUyNjY4MjY3MzcyNjAuMTQsImNvc3RJbmMiOjMxNjIyNzc2LjYwMTY4Mzc3M30sImdlbjYiOnsiY29zdCI6MS43NzgyNzk0MTAwMzg5MjIzZSsxMDUsImJhc2VNdWx0IjoxMjkuNzQ2MzM3ODkwNjI1LCJ1cGdyYWRlTXVsdCI6MjE0NzQ4MzY0OCwic3luTXVsdCI6MSwibXVsdCI6Mjc4NjI4MTM5MDA4LCJhbXQiOjEyLCJjb3N0SW5jIjo5OTk5OTk5OTkuOTk5OTk5OH0sInZlcnNpb24iOiJ2MC4yQiJ9")
	if(point === 'tier4') load("eyJudW1iZXIiOjEuOTM3NTA3NTY1NDc5NzcyZSs5MSwiYWN0aXZlVGFiIjoiZ2VucyIsInBvc3NpYmxlVXBzIjpbMSwyLDMsNCw1LDYsMTIsMTMsMTQsMTUsMTYsMjMsMjQsMjUsMjYsMzQsMzUsMzYsNDUsNDYsNTYsMTIzLDEyNCwxMjUsMTI2LDEzNCwxMzUsMTM2LDE0NSwxNDYsMTU2LDIzNCwyMzUsMjM2LDI0NSwyNDYsMjU2LDM0NSwzNDYsMzU2LDQ1NiwxMjM0LDEyMzUsMTIzNiwxMjQ1LDEyNDYsMTI1NiwxMzQ1LDEzNDYsMTM1NiwxNDU2LDIzNDUsMjM0NiwyMzU2LDI0NTYsMzQ1NiwxMjM0NSwxMjM0NiwxMjM1NiwxMjQ1NiwxMzQ1NiwyMzQ1NiwxMjM0NTZdLCJ1cGdyYWRlczEiOlsxLDIsMyw0LDUsNl0sInVwZ3JhZGVzMiI6WyIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2IiwiMjMiLCIyNCIsIjI1IiwiMjYiLCIzNiIsIjU2IiwiMzUiLCI0NiIsIjM0IiwiNDUiXSwidXBncmFkZXMzIjpbIjEyMyIsIjEyNCIsIjEyNSIsIjEyNiIsIjEzNCIsIjEzNSIsIjEzNiIsIjE0NSIsIjE0NiIsIjE1NiIsIjIzNCIsIjIzNSIsIjIzNiIsIjI0NSIsIjI0NiIsIjI1NiIsIjM0NSIsIjM0NiIsIjM1NiIsIjQ1NiJdLCJ1cGdyYWRlczQiOlsiMTIzNCIsIjEyMzUiLCIxMjM2IiwiMTI0NSIsIjEyNDYiLCIxMjU2IiwiMTM0NSIsIjE0NTYiLCIyMzQ1IiwiMTM0NiIsIjEzNTYiLCIyMzQ2IiwiMjM1NiIsIjI0NTYiLCIzNDU2Il0sInVwZ3JhZGVzNSI6W10sInVwZ3JhZGVzNiI6W10sInN5bmVyZ2llcyI6W10sImdlbjEiOnsiY29zdCI6MS4wMDAwMDAwMDAwMDAwMDIxZSs5MCwiYmFzZU11bHQiOjQxMjY0MzAxODQzODAwMy4yNSwidXBncmFkZU11bHQiOjY3MTA4ODY0LCJzeW5NdWx0IjoxLCJtdWx0IjoyLjc2OTIwMDQyMDQ5MDU0NTNlKzIyLCJhbXQiOjIuMDIwMDU5MjE1NTQzNDUzZSs2OCwiY29zdEluYyI6MzE2MjI3Ljc2NjAxNjgzNzg1fSwiZ2VuMiI6eyJjb3N0IjoxLjc3ODI3OTQxMDAzODkxODZlKzg4LCJiYXNlTXVsdCI6MjgzMzg3MzMzLjQyODQ2NjUsInVwZ3JhZGVNdWx0Ijo2NzEwODg2NCwic3luTXVsdCI6MSwibXVsdCI6MTkwMTc4MDIwMTgzNzM2MTIsImFtdCI6Mi41MjkwMDEwMTI0Mzg4ODI4ZSs1MSwiY29zdEluYyI6MzE2MjI3Ljc2NjAxNjgzNzg1fSwiZ2VuMyI6eyJjb3N0Ijo5Ljk5OTk5OTk5OTk5OTk3MWUrOTEsImJhc2VNdWx0IjoyMTg0MTY0LjQwOTA3NDU3LCJ1cGdyYWRlTXVsdCI6NjcxMDg4NjQsInN5bk11bHQiOjEsIm11bHQiOjE0NjU3Njc5MjI4MjIyNS43LCJhbXQiOjMuMjQ5Nzg5MzQ4OTU3NzQzNmUrMzYsImNvc3RJbmMiOjU2MjM0MS4zMjUxOTAzNDg5fSwiZ2VuNCI6eyJjb3N0Ijo1LjYyMzQxMzI1MTkwMzQ2OGUrODksImJhc2VNdWx0IjoxNjgzNC4xMTIxOTYwMjgyMzMsInVwZ3JhZGVNdWx0Ijo2NzEwODg2NCwic3luTXVsdCI6MSwibXVsdCI6MTEyOTcxODE0NTkyNCwiYW10Ijo0LjAxOTU2NTc2MTU0NDA1MzRlKzIzLCJjb3N0SW5jIjo5OTk5OTkuOTk5OTk5OTk5N30sImdlbjUiOnsiY29zdCI6NS42MjM0MTMyNTE5MDM0NzZlKzg4LCJiYXNlTXVsdCI6NjU2Ljg0MDgzNTU3MTI4OTEsInVwZ3JhZGVNdWx0Ijo2NzEwODg2NCwic3luTXVsdCI6MSwibXVsdCI6NDQwNzk4NDIzMDQsImFtdCI6ODQxOTIwMTQyNTQ0LjIsImNvc3RJbmMiOjU2MjM0MTMuMjUxOTAzNDg4fSwiZ2VuNiI6eyJjb3N0IjoxZSs4OCwiYmFzZU11bHQiOjU3LjY2NTAzOTA2MjUsInVwZ3JhZGVNdWx0Ijo2NzEwODg2NCwic3luTXVsdCI6MSwibXVsdCI6Mzg2OTgzNTI2NCwiYW10IjoxMCwiY29zdEluYyI6MzE2MjI3NzY2LjAxNjgzNzl9LCJ2ZXJzaW9uIjoidjAuMkIifQ==")
	if(point === 'tier3') load("eyJudW1iZXIiOjIuMzExNzI0Njk2MTA3MzMzNWUrNjcsImFjdGl2ZVRhYiI6ImdlbnMiLCJwb3NzaWJsZVVwcyI6WzEsMiwzLDQsNSw2LDEyLDEzLDE0LDE1LDE2LDIzLDI0LDI1LDI2LDM0LDM1LDM2LDQ1LDQ2LDU2LDEyMywxMjQsMTI1LDEyNiwxMzQsMTM1LDEzNiwxNDUsMTQ2LDE1NiwyMzQsMjM1LDIzNiwyNDUsMjQ2LDI1NiwzNDUsMzQ2LDM1Niw0NTYsMTIzNCwxMjM1LDEyMzYsMTI0NSwxMjQ2LDEyNTYsMTM0NSwxMzQ2LDEzNTYsMTQ1NiwyMzQ1LDIzNDYsMjM1NiwyNDU2LDM0NTYsMTIzNDUsMTIzNDYsMTIzNTYsMTI0NTYsMTM0NTYsMjM0NTYsMTIzNDU2XSwidXBncmFkZXMxIjpbMSwyLDMsNCw1LDZdLCJ1cGdyYWRlczIiOlsiMTIiLCIxMyIsIjE0IiwiMTUiLCIxNiIsIjIzIiwiMjQiLCIyNSIsIjI2IiwiMzYiLCI1NiIsIjM1IiwiNDYiLCIzNCIsIjQ1Il0sInVwZ3JhZGVzMyI6WyIxMjMiLCIxMjQiLCIxMjUiLCIxMjYiLCIxMzQiLCIxMzUiLCIxMzYiLCIxNDUiLCIxNDYiLCIxNTYiLCIyMzQiLCIyMzUiLCIyMzYiLCIyNDUiLCIyNDYiLCIyNTYiLCIzNDUiLCIzNDYiLCIzNTYiLCI0NTYiXSwidXBncmFkZXM0IjpbXSwidXBncmFkZXM1IjpbXSwidXBncmFkZXM2IjpbXSwic3luZXJnaWVzIjpbXSwiZ2VuMSI6eyJjb3N0IjoxLjc3ODI3OTQxMDAzODkyOWUrNjYsImJhc2VNdWx0Ijo1NDMzOTgyMTM1ODA5MC45NiwidXBncmFkZU11bHQiOjY1NTM2LCJzeW5NdWx0IjoxLCJtdWx0IjozNTYxMjE0NTMyNTIzODQ5MDAwLCJhbXQiOjMuNjQ4NDY5Mjk3NDQxMTUyZSs0OCwiY29zdEluYyI6MTc3ODIuNzk0MTAwMzg5MjIzfSwiZ2VuMiI6eyJjb3N0Ijo1LjYyMzQxMzI1MTkwMzQ4NGUrNjgsImJhc2VNdWx0Ijo1NTk3Nzc0NC44NzQ3NTg4MiwidXBncmFkZU11bHQiOjY1NTM2LCJzeW5NdWx0IjoxLCJtdWx0IjozNjY4NTU3NDg4MTEyLjE5NCwiYW10Ijo0LjYxMzIzMDA5MDk3MjI0MWUrMzUsImNvc3RJbmMiOjMxNjIyLjc3NjYwMTY4Mzc4NX0sImdlbjMiOnsiY29zdCI6OS45OTk5OTk5OTk5OTk5ODVlKzY2LCJiYXNlTXVsdCI6Mjg3NjI2LjU4ODg0OTMyNjEzLCJ1cGdyYWRlTXVsdCI6NjU1MzYsInN5bk11bHQiOjEsIm11bHQiOjE4ODQ5ODk2MTI2LjgyOTQzNywiYW10Ijo5LjAwMTc0NTc2ODM3MDQ0MmUrMjQsImNvc3RJbmMiOjMxNjIyLjc3NjYwMTY4Mzc4NX0sImdlbjQiOnsiY29zdCI6MS43NzgyNzk0MTAwMzg5MThlKzY4LCJiYXNlTXVsdCI6MzMyNS4yNTY3MzAwNzk2NTEsInVwZ3JhZGVNdWx0Ijo2NTUzNiwic3luTXVsdCI6MSwibXVsdCI6MjE3OTI0MDI1LjA2MjUsImFtdCI6MTEyNTA5NTMzMDc2MzY5NzAsImNvc3RJbmMiOjk5OTk5Ljk5OTk5OTk5OTk3fSwiZ2VuNSI6eyJjb3N0Ijo5Ljk5OTk5OTk5OTk5OTk4NGUrNjksImJhc2VNdWx0IjoxOTQuNjE5NTA2ODM1OTM3NSwidXBncmFkZU11bHQiOjY1NTM2LCJzeW5NdWx0IjoxLCJtdWx0IjoxMjc1NDU4NCwiYW10IjoxNTY5MDE1NTUuNjAwMDAwMDUsImNvc3RJbmMiOjk5OTk5OS45OTk5OTk5OTk3fSwiZ2VuNiI6eyJjb3N0Ijo1LjYyMzQxMzI1MTkwMzQ5MWUrNzEsImJhc2VNdWx0IjoyNS42Mjg5MDYyNSwidXBncmFkZU11bHQiOjY1NTM2LCJzeW5NdWx0IjoxLCJtdWx0IjoxNjc5NjE2LCJhbXQiOjgsImNvc3RJbmMiOjEwMDAwMDAwMH0sInZlcnNpb24iOiJ2MC4yQiJ9")
	if(point === 'tier2') load("eyJudW1iZXIiOjIuMDM1Mzk3ODQyMzA2NTA5NmUrNDIsImFjdGl2ZVRhYiI6ImdlbnMiLCJwb3NzaWJsZVVwcyI6WzEsMiwzLDQsNSw2LDEyLDEzLDE0LDE1LDE2LDIzLDI0LDI1LDI2LDM0LDM1LDM2LDQ1LDQ2LDU2LDEyMywxMjQsMTI1LDEyNiwxMzQsMTM1LDEzNiwxNDUsMTQ2LDE1NiwyMzQsMjM1LDIzNiwyNDUsMjQ2LDI1NiwzNDUsMzQ2LDM1Niw0NTYsMTIzNCwxMjM1LDEyMzYsMTI0NSwxMjQ2LDEyNTYsMTM0NSwxMzQ2LDEzNTYsMTQ1NiwyMzQ1LDIzNDYsMjM1NiwyNDU2LDM0NTYsMTIzNDUsMTIzNDYsMTIzNTYsMTI0NTYsMTM0NTYsMjM0NTYsMTIzNDU2XSwidXBncmFkZXMxIjpbMSwyLDMsNCw1LDZdLCJ1cGdyYWRlczIiOlsiMTIiLCIxMyIsIjE0IiwiMTUiLCIxNiIsIjIzIiwiMjQiLCIyNSIsIjI2IiwiMzYiLCI1NiIsIjM1IiwiNDYiLCIzNCIsIjQ1Il0sInVwZ3JhZGVzMyI6W10sInVwZ3JhZGVzNCI6W10sInVwZ3JhZGVzNSI6W10sInVwZ3JhZGVzNiI6W10sInN5bmVyZ2llcyI6W10sImdlbjEiOnsiY29zdCI6MS43NzgyNzk0MTAwMzg5MzAzZSszOSwiYmFzZU11bHQiOjE0MTM1MDM0NTY1NTMuNTAxNSwidXBncmFkZU11bHQiOjY0LCJzeW5NdWx0IjoxLCJtdWx0Ijo5MDQ2NDIyMTIxOTQyNC4xLCJhbXQiOjkuNTMyMDUyOTI2OTU1MDk3ZSsyNywiY29zdEluYyI6MTAwfSwiZ2VuMiI6eyJjb3N0IjozLjE2MjI3NzY2MDE2ODM3OWUrMzksImJhc2VNdWx0IjoxNDU2MTA5LjYwNjA0OTcxMzQsInVwZ3JhZGVNdWx0Ijo2NCwic3luTXVsdCI6MSwibXVsdCI6OTMxOTEwMTQuNzg3MTgxNjYsImFtdCI6MzU5Njk5MjI2MTUwMzc1NDIwMDAsImNvc3RJbmMiOjE3Ny44Mjc5NDEwMDM4OTIyOH0sImdlbjMiOnsiY29zdCI6OS45OTk5OTk5OTk5OTk5OTdlKzM5LCJiYXNlTXVsdCI6MTEyMjIuNzQxNDY0MDE4ODIyLCJ1cGdyYWRlTXVsdCI6NjQsInN5bk11bHQiOjEsIm11bHQiOjcxODI1NS40NTM2OTcyMDQ2LCJhbXQiOjE0MDM4MTQ1MTc2NTM3Ljc2LCJjb3N0SW5jIjozMTYuMjI3NzY2MDE2ODM3OX0sImdlbjQiOnsiY29zdCI6MS43NzgyNzk0MTAwMzg5MjAzZSs0MCwiYmFzZU11bHQiOjE5NC42MTk1MDY4MzU5Mzc1LCJ1cGdyYWRlTXVsdCI6NjQsInN5bk11bHQiOjEsIm11bHQiOjEyNDU1LjY0ODQzNzUsImFtdCI6MjM1MjQ0MTQ5LjQwODc1MDEyLCJjb3N0SW5jIjoxNzc4LjI3OTQxMDAzODkyMjZ9LCJnZW41Ijp7ImNvc3QiOjUuNjIzNDEzMjUxOTAzNDg4ZSs0MywiYmFzZU11bHQiOjI1LjYyODkwNjI1LCJ1cGdyYWRlTXVsdCI6NjQsInN5bk11bHQiOjEsIm11bHQiOjE2NDAuMjUsImFtdCI6MTk2MzIuNzk5OTk5OTk5OTksImNvc3RJbmMiOjU2MjM0LjEzMjUxOTAzNDl9LCJnZW42Ijp7ImNvc3QiOjEuNzc4Mjc5NDEwMDM4OTIzM2UrNDIsImJhc2VNdWx0Ijo1LjA2MjUsInVwZ3JhZGVNdWx0Ijo2NCwic3luTXVsdCI6MSwibXVsdCI6MzI0LCJhbXQiOjQsImNvc3RJbmMiOjEwMDAwMDAwfSwidmVyc2lvbiI6InYwLjJCIn0=")
	if(point === 'tier1') load("eyJudW1iZXIiOjEuNDY3NTc3NjkzMTIwNTM2MmUrMjUsImFjdGl2ZVRhYiI6ImdlbnMiLCJwb3NzaWJsZVVwcyI6WzEsMiwzLDQsNSw2LDEyLDEzLDE0LDE1LDE2LDIzLDI0LDI1LDI2LDM0LDM1LDM2LDQ1LDQ2LDU2LDEyMywxMjQsMTI1LDEyNiwxMzQsMTM1LDEzNiwxNDUsMTQ2LDE1NiwyMzQsMjM1LDIzNiwyNDUsMjQ2LDI1NiwzNDUsMzQ2LDM1Niw0NTYsMTIzNCwxMjM1LDEyMzYsMTI0NSwxMjQ2LDEyNTYsMTM0NSwxMzQ2LDEzNTYsMTQ1NiwyMzQ1LDIzNDYsMjM1NiwyNDU2LDM0NTYsMTIzNDUsMTIzNDYsMTIzNTYsMTI0NTYsMTM0NTYsMjM0NTYsMTIzNDU2XSwidXBncmFkZXMxIjpbMSwyLDMsNCw1LDZdLCJ1cGdyYWRlczIiOltdLCJ1cGdyYWRlczMiOltdLCJ1cGdyYWRlczQiOltdLCJ1cGdyYWRlczUiOltdLCJ1cGdyYWRlczYiOltdLCJzeW5lcmdpZXMiOltdLCJnZW4xIjp7ImNvc3QiOjEuMDAwMDAwMDAwMDAwMDAyNmUrMjMsImJhc2VNdWx0Ijo1NTk3Nzc0NC44NzQ3NTg4MiwidXBncmFkZU11bHQiOjIsInN5bk11bHQiOjEsIm11bHQiOjExMTk1NTQ4OS43NDk1MTc2MywiYW10IjoxNjg5MzY4MTQyNTcwMDY0MCwiY29zdEluYyI6My4xNjIyNzc2NjAxNjgzNzk1fSwiZ2VuMiI6eyJjb3N0IjoxZSsyMywiYmFzZU11bHQiOjQ5ODcuODg1MDk1MTE5NDc2LCJ1cGdyYWRlTXVsdCI6Miwic3luTXVsdCI6MSwibXVsdCI6OTk3NS43NzAxOTAyMzg5NTMsImFtdCI6MTc0MzMyNzY2Mzk1LjIzMzU1LCJjb3N0SW5jIjoxMH0sImdlbjMiOnsiY29zdCI6My4xNjIyNzc2NjAxNjgzNzg2ZSsyMywiYmFzZU11bHQiOjE5NC42MTk1MDY4MzU5Mzc1LCJ1cGdyYWRlTXVsdCI6Miwic3luTXVsdCI6MSwibXVsdCI6Mzg5LjIzOTAxMzY3MTg3NSwiYW10IjozNjg0NjEyMi40MDgwNTI4NCwiY29zdEluYyI6MzEuNjIyNzc2NjAxNjgzNzkzfSwiZ2VuNCI6eyJjb3N0IjozLjE2MjI3NzY2MDE2ODM3N2UrMjQsImJhc2VNdWx0IjoxNy4wODU5Mzc1LCJ1cGdyYWRlTXVsdCI6Miwic3luTXVsdCI6MSwibXVsdCI6MzQuMTcxODc1LCJhbXQiOjY4MTY3Ljg3ODQzNzUwMDY0LCJjb3N0SW5jIjozMTYuMjI3NzY2MDE2ODM3OX0sImdlbjUiOnsiY29zdCI6OS45OTk5OTk5OTk5OTk5OTllKzI2LCJiYXNlTXVsdCI6NS4wNjI1LCJ1cGdyYWRlTXVsdCI6Miwic3luTXVsdCI6MSwibXVsdCI6MTAuMTI1LCJhbXQiOjMxMC43NTAwMDAwMDAwMDEsImNvc3RJbmMiOjEwMDAwfSwiZ2VuNiI6eyJjb3N0IjoxLjAwMDAwMDAwMDAwMDAwMDFlKzI5LCJiYXNlTXVsdCI6Mi4yNSwidXBncmFkZU11bHQiOjIsInN5bk11bHQiOjEsIm11bHQiOjQuNSwiYW10IjoyLCJjb3N0SW5jIjozMTYyMjc3LjY2MDE2ODM3OTV9LCJ2ZXJzaW9uIjoidjAuMkIifQ==")
	if(point === 'preupg') load("eyJudW1iZXIiOjQ4MTg1NTM0MTgwOTA5MDUwLCJhY3RpdmVUYWIiOiJnZW5zIiwicG9zc2libGVVcHMiOlsxLDIsMyw0LDUsNiwxMiwxMywxNCwxNSwxNiwyMywyNCwyNSwyNiwzNCwzNSwzNiw0NSw0Niw1NiwxMjMsMTI0LDEyNSwxMjYsMTM0LDEzNSwxMzYsMTQ1LDE0NiwxNTYsMjM0LDIzNSwyMzYsMjQ1LDI0NiwyNTYsMzQ1LDM0NiwzNTYsNDU2LDEyMzQsMTIzNSwxMjM2LDEyNDUsMTI0NiwxMjU2LDEzNDUsMTM0NiwxMzU2LDE0NTYsMjM0NSwyMzQ2LDIzNTYsMjQ1NiwzNDU2LDEyMzQ1LDEyMzQ2LDEyMzU2LDEyNDU2LDEzNDU2LDIzNDU2LDEyMzQ1Nl0sInVwZ3JhZGVzMSI6W10sInVwZ3JhZGVzMiI6W10sInVwZ3JhZGVzMyI6W10sInVwZ3JhZGVzNCI6W10sInVwZ3JhZGVzNSI6W10sInVwZ3JhZGVzNiI6W10sInN5bmVyZ2llcyI6W10sImdlbjEiOnsiY29zdCI6MTAwMDAwMDAwMDAwMDAwMjIsImJhc2VNdWx0IjoxOTE3NTEuMDU5MjMyODg0MSwidXBncmFkZU11bHQiOjEsInN5bk11bHQiOjEsIm11bHQiOjE5MTc1MS4wNTkyMzI4ODQxLCJhbXQiOjQxMzI3MDg5NDI2LjA1MzQ5LCJjb3N0SW5jIjozLjE2MjI3NzY2MDE2ODM3OTV9LCJnZW4yIjp7ImNvc3QiOjEwMDAwMDAwMDAwMDAwMDAwLCJiYXNlTXVsdCI6MjkxLjkyOTI2MDI1MzkwNjI1LCJ1cGdyYWRlTXVsdCI6MSwic3luTXVsdCI6MSwibXVsdCI6MjkxLjkyOTI2MDI1MzkwNjI1LCJhbXQiOjExNDk5MDk1LjI3MzU3MTkzMywiY29zdEluYyI6MTB9LCJnZW4zIjp7ImNvc3QiOjk5OTk5OTk5OTk5OTk5OTgsImJhc2VNdWx0IjoyNS42Mjg5MDYyNSwidXBncmFkZU11bHQiOjEsInN5bk11bHQiOjEsIm11bHQiOjI1LjYyODkwNjI1LCJhbXQiOjI1MDU5LjY5MDMxMjUwMDAyOCwiY29zdEluYyI6MzEuNjIyNzc2NjAxNjgzNzkzfSwiZ2VuNCI6eyJjb3N0Ijo5OTk5OTk5OTk5OTk5OTk1MCwiYmFzZU11bHQiOjUuMDYyNSwidXBncmFkZU11bHQiOjEsInN5bk11bHQiOjEsIm11bHQiOjUuMDYyNSwiYW10IjoyNzEuNjE1MDAwMDAwMDAwMywiY29zdEluYyI6MzE2LjIyNzc2NjAxNjgzNzl9LCJnZW41Ijp7ImNvc3QiOjEwMDAwMDAwMDAwMDAwMDAwMDAwLCJiYXNlTXVsdCI6Mi4yNSwidXBncmFkZU11bHQiOjEsInN5bk11bHQiOjEsIm11bHQiOjIuMjUsImFtdCI6MTIuODAwMDAwMDAwMDAwMDE4LCJjb3N0SW5jIjoxMDAwMH0sImdlbjYiOnsiY29zdCI6My4xNjIyNzc2NjAxNjgzNzk2ZSsyMiwiYmFzZU11bHQiOjEuNSwidXBncmFkZU11bHQiOjEsInN5bk11bHQiOjEsIm11bHQiOjEuNSwiYW10IjoxLCJjb3N0SW5jIjozMTYyMjc3LjY2MDE2ODM3OTV9fQ==")
	if(point === 'fifth') load("eyJudW1iZXIiOjQ1OTg1NDkyODI0OC43NDI3LCJhY3RpdmVUYWIiOiJnZW5zIiwicG9zc2libGVVcHMiOlsxLDIsMyw0LDUsNiwxMiwxMywxNCwxNSwxNiwyMywyNCwyNSwyNiwzNCwzNSwzNiw0NSw0Niw1NiwxMjMsMTI0LDEyNSwxMjYsMTM0LDEzNSwxMzYsMTQ1LDE0NiwxNTYsMjM0LDIzNSwyMzYsMjQ1LDI0NiwyNTYsMzQ1LDM0NiwzNTYsNDU2LDEyMzQsMTIzNSwxMjM2LDEyNDUsMTI0NiwxMjU2LDEzNDUsMTM0NiwxMzU2LDE0NTYsMjM0NSwyMzQ2LDIzNTYsMjQ1NiwzNDU2LDEyMzQ1LDEyMzQ2LDEyMzU2LDEyNDU2LDEzNDU2LDIzNDU2LDEyMzQ1Nl0sInVwZ3JhZGVzMSI6W10sInVwZ3JhZGVzMiI6W10sInVwZ3JhZGVzMyI6W10sInVwZ3JhZGVzNCI6W10sInVwZ3JhZGVzNSI6W10sInVwZ3JhZGVzNiI6W10sInN5bmVyZ2llcyI6W10sImdlbjEiOnsiY29zdCI6MTAwMDAwMDAwMDAwLjAwMDE1LCJiYXNlTXVsdCI6MzMyNS4yNTY3MzAwNzk2NTEsInVwZ3JhZGVNdWx0IjoxLCJzeW5NdWx0IjoxLCJtdWx0IjozMzI1LjI1NjczMDA3OTY1MSwiYW10IjoxOTAzOTQ2NC42NDY3Nzk1MDcsImNvc3RJbmMiOjMuMTYyMjc3NjYwMTY4Mzc5NX0sImdlbjIiOnsiY29zdCI6MTAwMDAwMDAwMDAwLCJiYXNlTXVsdCI6MzguNDQzMzU5Mzc1LCJ1cGdyYWRlTXVsdCI6MSwic3luTXVsdCI6MSwibXVsdCI6MzguNDQzMzU5Mzc1LCJhbXQiOjM3MTc1LjQ1MTkxNDA2MjQyNSwiY29zdEluYyI6MTB9LCJnZW4zIjp7ImNvc3QiOjMxNjIyNzc2NjAxNi44Mzc5LCJiYXNlTXVsdCI6Ny41OTM3NSwidXBncmFkZU11bHQiOjEsInN5bk11bHQiOjEsIm11bHQiOjcuNTkzNzUsImFtdCI6MzY2LjA4NzQ5OTk5OTk5OTcsImNvc3RJbmMiOjMxLjYyMjc3NjYwMTY4Mzc5M30sImdlbjQiOnsiY29zdCI6OTk5OTk5OTk5OTk5Ljk5OTgsImJhc2VNdWx0IjoyLjI1LCJ1cGdyYWRlTXVsdCI6MSwic3luTXVsdCI6MSwibXVsdCI6Mi4yNSwiYW10IjoxNy4xNTAwMDAwMDAwMDAwMTYsImNvc3RJbmMiOjMxNi4yMjc3NjYwMTY4Mzc5fSwiZ2VuNSI6eyJjb3N0IjoxMDAwMDAwMDAwMDAwMDAwLCJiYXNlTXVsdCI6MS41LCJ1cGdyYWRlTXVsdCI6MSwic3luTXVsdCI6MSwibXVsdCI6MS41LCJhbXQiOjEsImNvc3RJbmMiOjEwMDAwfSwiZ2VuNiI6eyJjb3N0IjoxMDAwMDAwMDAwMDAwMDAwMCwiYmFzZU11bHQiOjEsInVwZ3JhZGVNdWx0IjoxLCJzeW5NdWx0IjoxLCJtdWx0IjoxLCJhbXQiOjAsImNvc3RJbmMiOjMxNjIyNzcuNjYwMTY4Mzc5NX19")
	if(point === 'early') load("eyJudW1iZXIiOjcxNjQ0LjMxNzg1NTgwNjY0LCJhY3RpdmVUYWIiOiJnZW5zIiwicG9zc2libGVVcHMiOlsxLDIsMyw0LDUsNiwxMiwxMywxNCwxNSwxNiwyMywyNCwyNSwyNiwzNCwzNSwzNiw0NSw0Niw1NiwxMjMsMTI0LDEyNSwxMjYsMTM0LDEzNSwxMzYsMTQ1LDE0NiwxNTYsMjM0LDIzNSwyMzYsMjQ1LDI0NiwyNTYsMzQ1LDM0NiwzNTYsNDU2LDEyMzQsMTIzNSwxMjM2LDEyNDUsMTI0NiwxMjU2LDEzNDUsMTM0NiwxMzU2LDE0NTYsMjM0NSwyMzQ2LDIzNTYsMjQ1NiwzNDU2LDEyMzQ1LDEyMzQ2LDEyMzU2LDEyNDU2LDEzNDU2LDIzNDU2LDEyMzQ1Nl0sInVwZ3JhZGVzMSI6W10sInVwZ3JhZGVzMiI6W10sInVwZ3JhZGVzMyI6W10sInVwZ3JhZGVzNCI6W10sInVwZ3JhZGVzNSI6W10sInVwZ3JhZGVzNiI6W10sInN5bmVyZ2llcyI6W10sImdlbjEiOnsiY29zdCI6MTAwMDAuMDAwMDAwMDAwMDA0LCJiYXNlTXVsdCI6MTEuMzkwNjI1LCJ1cGdyYWRlTXVsdCI6MSwic3luTXVsdCI6MSwibXVsdCI6MTEuMzkwNjI1LCJhbXQiOjgwOS44MzMxMjQ5OTk5OTksImNvc3RJbmMiOjMuMTYyMjc3NjYwMTY4Mzc5NX0sImdlbjIiOnsiY29zdCI6MTAwMDAwLCJiYXNlTXVsdCI6My4zNzUsInVwZ3JhZGVNdWx0IjoxLCJzeW5NdWx0IjoxLCJtdWx0IjozLjM3NSwiYW10IjoyMy42OTk5OTk5OTk5OTk5NTMsImNvc3RJbmMiOjEwfSwiZ2VuMyI6eyJjb3N0IjozMTYyMjcuNzY2MDE2ODM3OSwiYmFzZU11bHQiOjEuNSwidXBncmFkZU11bHQiOjEsInN5bk11bHQiOjEsIm11bHQiOjEuNSwiYW10IjoxLCJjb3N0SW5jIjozMS42MjI3NzY2MDE2ODM3OTN9LCJnZW40Ijp7ImNvc3QiOjEwMDAwMDAwLCJiYXNlTXVsdCI6MSwidXBncmFkZU11bHQiOjEsInN5bk11bHQiOjEsIm11bHQiOjEsImFtdCI6MCwiY29zdEluYyI6MzE2LjIyNzc2NjAxNjgzNzl9LCJnZW41Ijp7ImNvc3QiOjEwMDAwMDAwMDAwMCwiYmFzZU11bHQiOjEsInVwZ3JhZGVNdWx0IjoxLCJzeW5NdWx0IjoxLCJtdWx0IjoxLCJhbXQiOjAsImNvc3RJbmMiOjEwMDAwfSwiZ2VuNiI6eyJjb3N0IjoxMDAwMDAwMDAwMDAwMDAwMCwiYmFzZU11bHQiOjEsInVwZ3JhZGVNdWx0IjoxLCJzeW5NdWx0IjoxLCJtdWx0IjoxLCJhbXQiOjAsImNvc3RJbmMiOjMxNjIyNzcuNjYwMTY4Mzc5NX19")
}
