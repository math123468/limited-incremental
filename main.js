//default save
function reset() { 
	var game = {
		number:new Decimal(10),
		version:currentVer,
		activeTab:'gens',
		timePlayed:0,
		standardTime:0,
		notation:'standard',
		theme:'dark',
		possibleUps:[1,2,3,4,5,6,12,13,14,15,16,23,24,25,26,34,35,36,45,46,56,123,124,125,126,134,135,136,145,146,
			     156,234,235,236,245,246,256,345,346,356,456,1234,1235,1236,1245,1246,1256,1345,1346,1356,1456,
			     2345,2346,2356,2456,3456,12345,12346,12356,12456,13456,23456,123456,7],
		upgrades1:[],
		upgrades2:[],
		upgrades3:[],
		upgrades4:[],
		upgrades5:[],
		upgrades6:[],
		synergies:[],
		achievements:[],
		newsSeen:0,
		gen0:{
			cost:new Decimal(0),
			baseMult:0,
			upgradeMult:0,
			synMult:0,
			mult:0,
			amt:new Decimal(0),
			costInc:0,
		},
		gen1:{
			cost:new Decimal(10),
			actualCost:new Decimal(10),
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:new Decimal(0),
			costInc:Math.pow(10,0.5)
		},
		gen2:{
			cost:new Decimal(100),
			actualCost:new Decimal(100),
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:new Decimal(0),
			costInc:10
		},
		gen3:{
			cost:new Decimal(1e4),
			actualCost:new Decimal(1e4),
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:new Decimal(0),
			costInc:Math.pow(10,1.5)
		},
		gen4:{
			cost:new Decimal(1e7),
			actualCost:new Decimal(1e7),
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:new Decimal(0),
			costInc:Math.pow(10,2.5)
		},
		gen5:{
			cost:new Decimal(1e11),
			actualCost:new Decimal(1e11),
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:new Decimal(0),
			costInc:1e4
		},
		gen6:{
			cost:new Decimal(1e16),
			actualCost:new Decimal(1e16),
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:new Decimal(0),
			costInc:Math.pow(10,6.5)
		},
		gen7:{
			cost:new Decimal(1e22),
			actualCost:new Decimal(1e22),
			baseMult:1,
			upgradeMult:1,
			synMult:1,
			mult:1,
			amt:new Decimal(0),
			costInc:Math.pow(10,10.5)
		},
		negative:{
			cost:new Decimal(10),
			upgrades:{
				one:0,
				two:0,
				three:0,
				four:0,
				onePower:1,
				twoPower:1,
				threePower:1.025,
				fourPower:2,
				total:0,
			},
			amt:0,
			mult:1,
		},
		thebutton:{
			mult:1,
			cooldown:0,
			baseCooldown:10,
			baseMult:1.1,
			clicks:0,
			possibleCooldowns:[1,10,100],
			possibleMults:[1.01,1.1,2.5],
		},
		decimalize:{
			times:0,
			decimals:new Decimal(0),
			currentTime:0,
			totalDecimals:new Decimal(0),
			upgrades:{
				possible:[1,2,3,4,5,6,7,8,9],
				owned:[],
			},
		},
		prestigeDims:{
			points:new Decimal(0),
			dim1:{
				cost:new Decimal(10),
				upgradeMult:1,
				synMult:1,
				mult:1,
				amt:new Decimal(0),
				costInc:Math.pow(10,0.5)
			},
		},
			
	}
	return game
}
const news = ['nothing to see here','Buy Prestige Upgrades to unlock the full power of the Prestige Dimensions!','lol','FAKE NEWS','Prestige Dimensions boost all gens. Reach 1.79e308 Prestige Points to SuperPrestige.',
	      'Decimal Upgrades give powerful boosts.','SEVENTH GENERATOR???','Does anyone even read this?','Hi, guys!',
	      'Once upon a time...','Much Number!','Next update in 5 days!','Upgrades boost different gens!',
	      'Synergies boost gens based on the amount of another!','Negative Numbers boost all gens! There are also cool upgrades!','The Button gives a boost each time you click!',
	      'You can change the cooldown time of the Button, but it will also change the mult gained on click.','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']
const newsTimes = [0.2,4,0.1,2,5,3,3,3,2,2.5,1.5,3,3,3,3,3,5,30]
//initalizing
var game = reset()
var currentVer = 'v0.2A'
function init() {
	update('commit','v0.2A-36')
	changeNews()
	setInterval(tick,100)
	setInterval(save,3000)
	if(localStorage.getItem('limitedIncrementalSave')!=null) load(localStorage.getItem('limitedIncrementalSave'))
	for(i=1;i<8;i++) game['gen'+i].actualCost = new Decimal(game['gen'+i].cost)
	game.decimalize.decimals = new Decimal(game.decimalize.decimals)
	game.decimalize.totalDecimals = new Decimal(game.decimalize.totalDecimals)
	setTimeout(start,1000)
}
function start() {
	theme()
	theme()
	achieveClasses()
	update('notation','Notation: '+game.notation)
	update('theButton',format(game.thebutton.mult,4) + 'x')
	update('negAmt',game.negative.amt)
	update('negBoost',format(game.negative.mult,3))
	if(game.decimalize.times > 0) {
		show('nav2')
	}
	if(game.decimalize.upgrades.owned.includes(1)) full('gen7')
	if(game.decimalize.upgrades.owned.includes(9)) inline('navp3')
}
//generic updating functions	
function update(what,withWhat) {
	document.getElementById(what).innerHTML = withWhat
}
function hide(what) {
	document.getElementById(what).style.display = 'none'
}
function show(what) {
	document.getElementById(what).style.display = 'block'
}
function inline(what) {
	document.getElementById(what).style.display = 'inline'
}
function full(what) {
	document.getElementById(what).style = 'width:100%'
}
function updateClass(what,whatClass) {
	var element = document.getElementById(what)
	element.className = ''
	element.classList.add(game.theme)
	if(whatClass.split(' ').length > 1) {
		whatClass = whatClass.split(' ')
		for(i=0;i<whatClass.length;i++) {
			element.classList.add(whatClass[i])
		}
	}
	else {
		element.classList.add(whatClass)
	}
}
function updateSecret(what) {
	var element = document.getElementById(what)
	element.className = ''
	element.classList.add('hidden'+game.theme)
}
function changeNews() {
	var nextNewsNum = Math.floor(news.length * Math.random())
	update('news',news[nextNewsNum])
	setTimeout('changeNews()',newsTimes[nextNewsNum] * 1000)
	game.newsSeen ++
	if(game.newsSeen === 500) giveAchieve('ach36')
}
function giveAchieve(number) {
	if(!game.achievements.includes(number)) {
		game.achievements.push(number)
		updateClass(number,'achievecomplete')
	}
}
function giveSecret(num) {
	if(num === 1) {
		giveAchieve('ach48')
		document.getElementById('ach48').title = 'Click the secret button next to the news ticker'
	}
	else if(num == 2) {
		giveAchieve('ach68')
		document.getElementById('ach68').title = 'Click on this achievement\'s slot'
	}
}
function changeTab(tab,superTab) {
	if(superTab == 0) {
		hide('gens')
		hide('upgrades')
		hide('syn')
		hide('negative')
		hide('thebutton')
		hide('options')
		hide('achievs')
	}
	else if(superTab == 1) {
		hide('decUpgrades')
	}
	else if(superTab == 2) {
		hide('prestigeDims')
		hide('prestigeUpgs')
	}
	game.activeTab = tab
	show(tab)
}
function changeTab2(tab) {
	hide('generators')
	hide('decimalize')
	hide('dimensions')
	show(tab)
}
function achieveClasses() {
	for(i=0;i<game.achievements.length;i++) {
		updateClass(game.achievements[i],'achievecomplete')
	}
}
function theme() {
	if(game.theme === 'dark') {
		game.theme = 'light'
		document.body.style = 'background-color:#FFFFFF'
		document.getElementById('commit').style = 'color:white'
		document.getElementById('htmlcommit').style = 'color:white'
		document.getElementById('news').style = 'color:black'
		document.getElementById('numfull').style = 'color:black'
	}
	else if(game.theme === 'light') {
		game.theme = 'dark'
		document.body.style = 'background-color:#000000'
		document.getElementById('commit').style = 'color:black'
		document.getElementById('htmlcommit').style = 'color:black'
		document.getElementById('news').style = 'color:white'
		document.getElementById('numfull').style = 'color:white'
	}
	updateSecret('secretach1')
	update('theme','Theme: '+game.theme)
	updateClass('theme','button')
	updateClass('max','button')
	updateClass('save','button')
	updateClass('import','button')
	updateClass('export','button')
	updateClass('hardreset','button')
	updateClass('navgen','nav')
	updateClass('navupg','nav')
	updateClass('navsyn','nav')
	updateClass('navneg','nav')
	updateClass('navach','nav')
	updateClass('navopt','nav')
	updateClass('navbut','nav')
	updateClass('navp1','nav2')
	updateClass('decupg','nav')
	updateClass('navp2','nav2')
	updateClass('prdims','nav')
	updateClass('prupgs','nav')
	updateClass('navp3','nav2')
	updateClass('notation','button')
	updateClass('theButton','button big')
	updateClass('cooldownwrapper','button')
	updateClass('buyNeg','button big')
	for(i=1;i<5;i++) {
		for(j=1;j<3;j++) {
			updateClass('neg' + i + j,'button')
		}
	}
	for(i=1;i<8;i++) {
		updateClass('buy'+i,'button')
	}
	for(i=1;i<7;i++) {
		for(j=1;j<9;j++) {
			updateClass('ach'+i+j,'achieve')
		}
	}
	for(i=1;i<game.decimalize.upgrades.possible.length+1;i++) {
		updateClass('dec'+i,'button')
	}
	for(i=1;i<7;i++) {
		updateClass('pbuy'+i,'button')
	}
	giveAchieve('ach38')
	achieveClasses()
}
function notation() {
	if(game.notation === 'standard') {
		game.notation = 'sci'
	}
	else if(game.notation === 'sci') {
		game.notation = 'standard'
	}
	for(i=0;i<game.possibleUps.length;i++) {
		var pos = game.possibleUps[i]
		update('up'+pos+'cost',format(returnUpgradeCost(pos,String(pos).length)),0)
		update('up7cost',format(1e150,0))
	}
	for(i=1;i<8;i++) {
		for(k=6;k>0;k--) {
			if(i == k) pass
			var thing = 10 * i + k
			update('syn'+thing+'cost',format(returnSynergyCost(thing),0))
		}
	}
	update('negCost',format(game.negative.cost,0))
	update('negBoost',format(game.negative.mult,4))
	update('notation','Notation: '+game.notation)
	giveAchieve('ach37')
}
//number formatting
function formatTime(s) {
	if(s < 60) return s + 'secs'
	var mins = Math.floor(s/60)
	var secs = s % 60
	if(mins < 60) return mins + 'mins' + secs + 'secs'
	var hrs = Math.floor(mins/60)
	mins = mins % 60
	if(hrs < 24) return hrs + 'hrs' + mins + 'mins' + secs + 'secs'
	var days = Math.floor(hrs/24)
	hrs = hrs % 24
	if(days < 365) return days + 'days' + hrs + 'hrs' + mins + 'mins' + secs + 'secs'
	var yrs = Math.floor(days/365)
	days = days % 365
	return yrs + 'yrs' + days + 'days' + hrs + 'hrs' + mins + 'mins' + secs + 'secs'
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
	var exp = Math.floor(Math.log10(num));
	var exp2 = 3*Math.floor(exp/3)
	var coeff = Math.round(Math.pow(10,Math.log10(num)-exp)*1000)/1000;
	if (coeff>9.9995) {
		coeff = 1;
		exp++;
	}
	if(game.notation === 'standard') {
		return Math.round(1000*coeff*Math.pow(10,exp-exp2))/1000+abbreviate(exp2/3-1,true)
	}
	if(game.notation === 'sci') {
		return coeff + 'e' + exp
	}
	console.log('You broke something')
	return 'you broke something'
}
function formatDecimal(a) {
	var exp = a.exponent;
	var mant = Math.round(a.mantissa*1000)/1000;
	if (mant>9.9995) {
		mant = 1;
		exp++;
	}
	if(a.lt(1000)) return format(a.mantissa * Math.pow(10,a.exponent),0)
	if (game.notation == 'sci') return mant + 'e' + exp;
	if(game.notation == 'standard') return Math.round(1000*mant*Math.pow(10,exp-3*Math.floor(exp/3)))/1000 + abbreviate(Math.floor(exp/3)-1,true)
}
//updates every tick
function displayUpdate() {
	update('num',formatDecimal(game.number))
	for(i=1;i<8;i++) {
		update(i+'amt',formatDecimal(game['gen'+i].amt))
		if(i!=7) {
			update(i+'persec',formatDecimal(game['gen'+(i+1)].amt.mul(game['gen'+(i+1)].mult,2)))
		}
		update('mult'+i,format(game['gen'+i].mult,4))
		update('cost'+i,formatDecimal(game['gen'+i].cost))
	}
	update('prestige',formatDecimal(game.prestigeDims.points))
	update('prestigeMult',Math.pow(game.prestigeDims.points,0.125))
}
function increaseGens() {
	for(i=1;i<8;i++) {
		game['gen'+i].synMult = 1
	}
	for(i=0;i<game.synergies.length;i++) {
		var gen1 = String(game.synergies[i])[0]
		var gen2 = String(game.synergies[i])[1]
		game['gen'+gen1].synMult *= 1 + game['gen'+gen2].amt.log(10) * 2
	}
	for(i=1;i<8;i++) {
		if(game.achievements.includes('ach27') && game.achievements.includes('ach34')) {
			game['gen'+i].mult = game['gen'+i].baseMult * game['gen'+i].upgradeMult * game['gen'+i].synMult * game.negative.mult * game.negative.upgrades.twoPower * game.thebutton.mult * 4
		}
		else if(game.achievements.includes('ach27') || game.achievements.includes('ach34')) {
			game['gen'+i].mult = game['gen'+i].baseMult * game['gen'+i].upgradeMult * game['gen'+i].synMult * game.negative.mult * game.negative.upgrades.twoPower * game.thebutton.mult * 2
		}
		else {
			game['gen'+i].mult = game['gen'+i].baseMult * game['gen'+i].upgradeMult * game['gen'+i].synMult * game.negative.mult * game.negative.upgrades.twoPower * game.thebutton.mult
		}
		game['gen'+i].mult *= Math.max(1,Math.pow(game.prestigeDims.points,0.125))
	}
	if(game.decimalize.upgrades.owned.includes(5)) {
		for(i=1;i<8;i++) {
			game['gen'+i].mult *= game.decimalize.totalDecimals
		}
	}
	game.number = game.number.add(game.gen1.amt.mul(game.gen1.mult / 10))
	game.gen1.amt = game.gen1.amt.add(game.gen2.amt.mul(game.gen2.mult / 10))
	game.gen2.amt = game.gen2.amt.add(game.gen3.amt.mul(game.gen3.mult / 10))
	game.gen3.amt = game.gen3.amt.add(game.gen4.amt.mul(game.gen4.mult / 10))
	game.gen4.amt = game.gen4.amt.add(game.gen5.amt.mul(game.gen5.mult / 10))
	game.gen5.amt = game.gen5.amt.add(game.gen6.amt.mul(game.gen6.mult / 10))
	game.gen6.amt = game.gen6.amt.add(game.gen7.amt.mul(game.gen7.mult / 10))
	if(game.gen1.amt.gte(1e100)) giveAchieve('ach33')
	if(game.gen1.amt.gte(1e200)) giveAchieve('ach57')
	if(game.gen6.mult >= 1e10) giveAchieve('ach34')
	if(game.gen6.mult >= 1e35) giveAchieve('ach58')
	if(game.number >= 1e125) giveAchieve('ach35')
}
function increaseDims() {
	game.prestigeDims.points = game.prestigeDims.points.add(game.prestigeDims.dim1.amt.mul(game.prestigeDims.dim1.mult))
}
function tick() {
	game.timePlayed += 0.1
	game.decimalize.currentTime += 0.1
	if(game.notation === 'standard') game.standardTime += 0.1
	if(game.timePlayed >= 420) giveAchieve('ach28')
	if(game.standardTime >= 600) giveAchieve('ach47')
	if(game.timePlayed-game.standardTime >= 600) giveAchieve('ach46')
	increaseGens()
	increaseDims()
	displayUpdate()
	if(game.activeTab === 'upgrades') checkIfUpgradesUnlocked()
	if(game.activeTab === 'syn') checkIfSynergiesUnlocked()
	if(game.activeTab === 'negative') checkIfNegativesUnlocked()
	if(game.activeTab === 'thebutton')checkIfButtonUnlocked()
	if(game.activeTab === 'decUpgrades') decimalClasses()
	checkIfDecimalizeUnlocked()
	game.thebutton.cooldown -= 0.1
	update('buttoncooldown',format(Math.max(game.thebutton.cooldown,0),1) + 's')
}
//checking if stuff is unlocked
function checkIfUpgradesUnlocked() {
	if(game.decimalize.times != 0) {
		for(i=1;i<8;i++) show('tier'+i)
		hide('upunlock')
		upgradeClasses()
		return
	}
	if(game.gen6.amt.lt(1)) {
		show('upunlock')
		hide('tier1')
		hide('tier2')
		hide('tier3')
		hide('tier4')
		hide('tier5')
		hide('tier6')
		return
	}
	if(game.gen6.amt.gt(0)) {
		giveAchieve('ach21')
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
		giveAchieve('ach22')
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
		giveAchieve('ach23')
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
		giveAchieve('ach24')
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
		giveAchieve('ach25')
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
		giveAchieve('ach26')
	}
	if(game.upgrades6.includes('123456')) giveAchieve('ach27')
	upgradeClasses()
}
function checkIfSynergiesUnlocked() {
	if(game.gen6.amt < 14 && game.decimalize.times == 0) {
		show('synunlock')
		hide('class1syn')
	}
	else {
		hide('synunlock')
		giveAchieve('ach31')
		show('class1syn')
		if(game.decimalize.upgrades.owned.includes(2)) show('class2syn')
	}
	synergyClasses()
}
function checkIfNegativesUnlocked() {
	if(game.gen6.amt < 20 && game.decimalize.times == 0) {
		show('negunlock')
		hide('neg1')
	}
	else {
		hide('negunlock')
		show('neg1')
		giveAchieve('ach41')
		if(game.decimalize.upgrades.owned.includes(4)) full('neg3')
	}
	negativeClasses()
}
function checkIfButtonUnlocked() {
	if(game.gen6.amt < 35 && game.decimalize.times == 0) {
		show('buttonunlock')
		hide('buttoninfo')
	}
	else {
		hide('buttonunlock')
		show('buttoninfo')
		giveAchieve('ach51')
	}
}
function checkIfDecimalizeUnlocked() {
	if(game.number.gte(1.79e308) && game.decimalize.times < 1) {
		giveAchieve('ach61')
		giveAchieve('ach62')
		window.alert('You have earned enough Number to decimalize! You will now lose your Generators and Upgrades but will gain a decimal point to spend on powerful upgrades!')
		decimalize(false)
	}
}
//purchasable upgrades
function upgradeClasses() {
	for(i=0;i<game.possibleUps.length;i++) {
		var up = game.possibleUps[i]
		if(up < 10) {
			if(game.upgrades1.includes(up)) {
				updateClass('up'+up,'button')
			}
			else if(game.number.gte(returnUpgradeCost(up,1))) {
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
			else if(game.number.gte(returnUpgradeCost(up,String(up).length))) {
				updateClass('up'+up,'red')
			}
			else {
				updateClass('up'+up,'green')
			}
		}
	}
}
function synergyClasses() {
	for(i=1;i<8;i++) {
		for(j=1;j<7;j++) {
			if(j != i) {
				var synNum = 10 * i + j
				if(game.synergies.includes(synNum)) updateClass('syn'+synNum,'button')
				else if(game.number.gte(returnSynergyCost(synNum))) updateClass('syn'+synNum,'red')
				else updateClass('syn'+synNum,'green')
			}
		}
	}
}
function negativeClasses() {
	for(i=1;i<=2;i++) {
		for(j=1;j<5;j++) {
			if(game.negative.upgrades.total >= 4 * (i - 1) + j) updateClass('neg' + j + i,'button')
			else updateClass('neg' + j + i,'green')
		}
	}
}
function decimalClasses() {
	for(i=1;i<10;i++) {
		if(game.decimalize.upgrades.owned.includes(i)) updateClass('dec'+i,'button')
		else if(game.decimalize.decimals.gte(returnDecimalCost(i))) {
			updateClass('dec'+i,'red')
		}
		else updateClass('dec'+i,'green')
	}
}
//buying stuff
function buyGen(i) {
	if(game.number.gte(game['gen'+i].cost)) {
		var costIncs = [1,1e4,Math.pow(10,4.5),1e5,Math.pow(10,5.5),1e6,1e7,1e12]
		if(game.decimalize.upgrades.owned.includes(8)) costIncs = [1,100,Math.pow(10,2.5),1e3,1e4,1e5,1e7,1e11]
		game.number = game.number.sub(game['gen'+i].cost)
		game['gen'+i].actualCost = game['gen'+i].actualCost.mul(game['gen'+i].costInc)
		game['gen'+i].baseMult *= 1.5
		if(game['gen'+i].cost >= 1e33) game['gen'+i].costInc *= Math.pow(10,0.25)
		game['gen'+i].amt = game['gen'+i].amt.add(1)
		game['gen'+i].cost = game['gen'+i].actualCost.div(game.negative.upgrades.onePower)
		game['gen'+i].costInc = Math.min(game['gen'+i].costInc, costIncs[i])
		if(i === 1) giveAchieve('ach11')
		if(i === 1 && game.gen1.baseMult > 1.6) giveAchieve('ach12')
		if(i === 2) giveAchieve('ach13')
		if(i === 3) giveAchieve('ach14')
		if(i === 4) giveAchieve('ach15')
		if(i === 5) giveAchieve('ach16')
		if(i === 6) giveAchieve('ach17')
		if(i === 7) giveAchieve('ach18')
		if(game.gen6.amt === 42) giveAchieve('ach56')
		if(game.gen6.amt === 66) giveAchieve('ach66')
	}
}
function buyMax() {
	var k = 6
	if(game.decimalize.upgrades.owned.includes(1)) k = 7
	for(i=k;i>0;i--) {
		while(game.number.gte(game['gen'+i].cost)) {
			buyGen(i)
		}
	}
}
function buyUp(num,tier) {
	if(tier === 1) {
		var cost = 1e21 * Math.pow(2,num-1)
		if(game.number.gte(cost) && !game.upgrades1.includes(num)) {
			game['gen'+num].upgradeMult *= 2
			game.number = game.number.sub(cost)
			game.upgrades1.push(num)
		}	
	}
	else if(tier === 2) {
		var pos = [12,13,14,15,16,23,24,25,26,34,35,36,45,46,56].indexOf(num)
		var cost = [1e27,5e27,2.5e28,1.25e29,6.25e29,1e30,5e30,2.5e31,1.25e32,6.25e32,1e33,2e33,4e33,8e33,1.6e34][pos]
		if(game.number.gte(cost) && !game.upgrades2.includes(String(num))) {
			num = String(num)
			game['gen'+num[0]].upgradeMult *= 2
			game['gen'+num[1]].upgradeMult *= 2
			game.number = game.number.sub(cost)
			game.upgrades2.push(num)
		}
	}
	else if(tier === 3) {
		var pos = [123,124,125,126,134,135,136,145,146,156,234,235,236,245,246,256,345,346,356,456].indexOf(num)
		var cost = [1e51,3e51,9e51,2.7e52,8.1e52,2.43e53,1e54,3e54,9e54,2.7e55,8.1e55,2.43e56,1e57,3e57,9e57,2.7e58,8.1e58,2.43e59,2e60,3e60][pos]
		if(game.number.gte(cost) && !game.upgrades3.includes(String(num))) {
			num = String(num)
			game['gen'+num[0]].upgradeMult *= 2
			game['gen'+num[1]].upgradeMult *= 2
			game['gen'+num[2]].upgradeMult *= 2
			game.number = game.number.sub(cost)
			game.upgrades3.push(num)
		}
	}
	else if(tier === 4) {
		var pos = [1234,1235,1236,1245,1246,1256,1345,1346,1356,1456,2345,2346,2356,2456,3456].indexOf(num)
		var cost = [1e75,5e75,2.5e76,1.25e77,6.25e77,1e78,5e78,2.5e79,1.25e80,6.25e80,1e81,5e81,2.5e82,1.25e83,6.25e83][pos]
		if(game.number.gte(cost) && !game.upgrades4.includes(String(num))) {
			num = String(num)
			game['gen'+num[0]].upgradeMult *= 2
			game['gen'+num[1]].upgradeMult *= 2
			game['gen'+num[2]].upgradeMult *= 2
			game['gen'+num[3]].upgradeMult *= 2
			game.number = game.number.sub(cost)
			game.upgrades4.push(num)
		}
	}
	else if(tier === 5) {
		var pos = [12345,12346,12356,12456,13456,23456].indexOf(num)
		var cost = [1e96,1e97,1e98,1e99,1e100,1e101][pos]
		if(game.number.gte(cost) && !game.upgrades5.includes(String(num))) {
			num = String(num)
			game['gen'+num[0]].upgradeMult *= 2
			game['gen'+num[1]].upgradeMult *= 2
			game['gen'+num[2]].upgradeMult *= 2
			game['gen'+num[3]].upgradeMult *= 2
			game['gen'+num[4]].upgradeMult *= 2
			game.number = game.number.sub(cost)
			game.upgrades5.push(num)
		}
	}
	else if(tier === 6) {
		if(game.number.gte(1e108) && !game.upgrades6.includes(num)) {
			game.number = game.number.sub(1e108)
			game.upgrades6.push(String(num))
			for(i=1;i<7;i++) {
				game['gen'+i].upgradeMult *= 2
			}
		}
	}
	else if(tier === 7) {
		if(game.number.gte(1e150) && !game.upgrades6.includes(num)) {
			game.number = game.number.sub(1e150)
			game.upgrades1.push('7')
			game.gen7.upgradeMult = Math.pow(2,32)
		}
	}
}
function buySyn(gen1,gen2) {
	var synNum = 10 * gen1 + gen2
	var cost = returnSynergyCost(synNum)
	if(game.number.gte(cost) && !game.synergies.includes(synNum)) {
		game.number = game.number.sub(cost)
		game.synergies.push(synNum)
	}
	if(game.synergies.length === 15) giveAchieve('ach32')
}
function buyNeg() {
	if(game.number.gte(game.negative.cost)) {
		game.number = game.number.sub(game.negative.cost)
		game.negative.amt ++
		game.negative.cost = game.negative.cost.mul(10)
		game.negative.mult *= game.negative.upgrades.threePower
	}
	update('negAmt',format(game.negative.amt,0))
	update('negCost',formatDecimal(game.negative.cost))
	update('negBoost',format(Math.pow(game.negative.upgrades.threePower,game.negative.amt),3))
	checkForNegUpgrades()
}
function buttonClick() {
	if(game.thebutton.cooldown <= 0) {
		game.thebutton.cooldown = game.thebutton.baseCooldown
		game.thebutton.mult *= game.thebutton.baseMult
		game.thebutton.clicks ++
		update('theButton',format(game.thebutton.mult,4) + 'x')
		if(game.thebutton.mult >= 100) giveAchieve('ach52')
		if(game.thebutton.clicks === 10) giveAchieve('ach54')
		if(game.thebutton.mult >= 1e9) giveAchieve('ach55')
		if(game.thebutton.click == 496) giveAchieve('ach67')
	}
}
function buyDec(num) {
	var cost = returnDecimalCost(num)
	if(game.decimalize.decimals.lt(cost)) return
	if(game.decimalize.upgrades.owned.includes(num)) return
	game.decimalize.decimals = game.decimalize.decimals.sub(cost)
	game.decimalize.upgrades.owned.push(num)
	giveAchieve('ach63')
	if(num == 4) giveAchieve('ach64')
	if(num == 1) full('gen7')
	if(num == 3) {
		game.thebutton.possibleCooldowns = [0.1,1,3.2,10,31.6,100]
		game.thebutton.possibleMults = [1.001,1.01,1.031,1.1,1.35,2.5]
	}
	if(num == 7) {
		for(i=0;i<game.thebutton.possibleCooldowns.length;i++) {
			game.thebutton.possibleCooldowns[i] /= 2
		}
	}
	if(num == 9) inline('navp3')
}	
function buyDim(num) {	
	if(game.decimalize.decimals.gte(game.prestigeDims['dim'+num].cost)) {	
		game.decimalize.decimals = game.decimalize.decimals.sub(game.prestigeDims['dim'+num].cost)	
		game.prestigeDims['dim'+num].cost = game['dim'+num].cost.mul(game.prestigeDims['dim'+num].costInc)	
		game.prestigeDims['dim'+num].mult *= 1.5	
		game.prestigeDims['dim'+num].amt = game.prestigeDims['dim'+num].amt.add(1)	
		update('pmult'+num,game.prestigeDims['dim'+num].mult)	
		update('p'+num+'amt',game.prestigeDims['dim'+num].amt)	
		update('pcost'+num,'0.'+game.prestigeDims['dim'+num].cost)	
	}	
}	
//upgrade misc	
function returnUpgradeCost(num,tier) {	
	var t2 = [1e27,5e27,2.5e28,1.25e29,6.25e29,1e30,5e30,2.5e31,1.25e32,6.25e32,1e33,2e33,4e33,8e33,1.6e34]	
	var t3 = [1e51,3e51,9e51,2.7e52,8.1e52,2.43e53,1e54,3e54,9e54,2.7e55,8.1e55,2.43e56,1e57,3e57,9e57,2.7e58,8.1e58,2.43e59,2e60,3e60]	
	var t4 = [1e75,5e75,2.5e76,1.25e77,6.25e77,1e78,5e78,2.5e79,1.25e80,6.25e80,1e81,5e81,2.5e82,1.25e83,6.25e83]	
	if(tier === 1) return 1e21 * Math.pow(2,num-1)	
	if(tier === 2) return t2[[12,13,14,15,16,23,24,25,26,34,35,36,45,46,56].indexOf(num)]	
	if(tier === 3) return t3[[123,124,125,126,134,135,136,145,146,156,234,235,236,245,246,256,345,346,356,456].indexOf(num)]	
	if(tier === 4) return t4[[1234,1235,1236,1245,1246,1256,1345,1346,1356,1456,2345,2346,2356,2456,3456].indexOf(num)]	
	if(tier === 5) return [1e96,1e97,1e98,1e99,1e100,1e101][[12345,12346,12356,12456,13456,23456].indexOf(num)]	
	return 1e108	
}	
//synergy misc	
function returnSynergyCost(synNum) {	
	var pos = [12,13,14,15,16,23,24,25,26,34,35,36,45,46,56].indexOf(synNum)	
	if(pos != -1) return 1e111 * Math.pow(10,pos)	
	return 1e183 * Math.pow(10,[21,31,41,51,61,32,42,52,62,43,53,63,54,64,65,71,72,73,74,75,76].indexOf(synNum))	
}	
//negative misc	
function checkForNegUpgrades() {	
	if(game.negative.amt >= 150 && game.negative.upgrades.one === 0) {	
		game.negative.upgrades.one = 1	
		game.negative.upgrades.onePower = 10	
		game.negative.upgrades.total ++	
		for(i=1;i<8;i++) {	
			game['gen'+i].cost = game['gen'+i].cost.div(10)	
		}	
		giveAchieve('ach42')	
	}	
	if(game.negative.amt >= 155 && game.negative.upgrades.two === 0) {	
		game.negative.upgrades.two = 1	
		game.negative.upgrades.twoPower = 5	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 160 && game.negative.upgrades.three === 0) {	
		game.negative.upgrades.three = 1	
		game.negative.upgrades.threePower = 1.05	
		update('negBoost',format(Math.pow(1.05,game.negative.amt),3))	
		update('negMult',1.05)	
		game.negative.mult = Math.pow(1.05,game.negative.amt)	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 165 && game.negative.upgrades.four === 0) {	
		game.negative.upgrades.four = 1	
		game.negative.upgrades.fourPower = 2.2	
		for(i=1;i<8;i++) {	
			game['gen'+i].upgradeMult = Math.pow(2.2,32)	
		}	
		giveAchieve('ach43')	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 175 && game.negative.upgrades.one === 1) {	
		game.negative.upgrades.one = 2	
		for(i=1;i<8;i++) {	
			game['gen'+i].cost = game['gen'+i].cost.div(1000)	
		}	
		game.negative.upgrades.onePower = 10000	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 190 && game.negative.upgrades.two === 1) {	
		game.negative.upgrades.two = 2	
		game.negative.upgrades.twoPower = 125	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 250 && game.negative.upgrades.three === 1) {	
		game.negative.upgrades.three = 2	
		game.negative.upgrades.threePower = 1.1	
		update('negBoost',format(Math.pow(1.1,game.negative.amt),3))	
		game.negative.mult = Math.pow(1.1,game.negative.amt)	
		update('negMult',1.1)	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 305 && game.negative.upgrades.four === 1) {	
		game.negative.upgrades.four = 2	
		game.negative.upgrades.fourPower = 2.35	
		for(i=1;i<8;i++) {	
			game['gen'+i].upgradeMult = Math.pow(2.35,32)	
		}	
		giveAchieve('ach44')	
		game.negative.upgrades.total ++	
	}	
	if(!game.decimalize.upgrades.owned.includes(4)) return	
	if(game.negative.amt >= 325 && game.negative.upgrades.one === 2) {	
		game.negative.upgrades.one = 3	
		for(i=1;i<8;i++) {	
			game['gen'+i].cost = game['gen'+i].cost.div(1e6)	
		}	
		game.negative.upgrades.onePower = 1e10	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 375 && game.negative.upgrades.two === 2) {	
		game.negative.upgrades.two = 3	
		game.negative.upgrades.twoPower = 15625	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 450 && game.negative.upgrades.three === 2) {	
		game.negative.upgrades.three = 3	
		game.negative.upgrades.threePower = 1.15	
		update('negBoost',format(Math.pow(1.15,game.negative.amt),3))	
		game.negative.mult = Math.pow(1.15,game.negative.amt)	
		update('negMult',1.15)	
		game.negative.upgrades.total ++	
	}	
	if(game.negative.amt >= 550 && game.negative.upgrades.four === 2) {	
		game.negative.upgrades.four = 3	
		game.negative.upgrades.fourPower = 2.5	
		for(i=1;i<8;i++) {	
			game['gen'+i].upgradeMult = Math.pow(2.5,32)	
		}	
		giveAchieve('ach44')	
		game.negative.upgrades.total ++	
	}	
}	
//button misc	
function changeButtonCooldown() {	
	var index = game.thebutton.possibleCooldowns.indexOf(game.thebutton.baseCooldown)	
	index ++	
	if(index === game.thebutton.possibleCooldowns.length)index = 0	
	game.thebutton.baseCooldown = game.thebutton.possibleCooldowns[index]	
	game.thebutton.baseMult = game.thebutton.possibleMults[index]	
	update('buttontime',formatTime(game.thebutton.baseCooldown))	
	update('buttonmult',format(game.thebutton.baseMult,2)+'x')	
	giveAchieve('ach53')	
}	
//decUpgrades misc	
function returnDecimalCost(num) {	
	return [1,1,1,2,3,5,10,20,50][num-1]	
}	
//prestiges	
function decimalize(confirm) {	
	if(game.number.lt(1.79e308)) return	
	if(confirm && window.confirm('Are you sure you want to decimalize? It will reset your previous progress!') || !confirm) {	
		window.alert('Note: All Decimal Point values have a decimal point added in front of them.')	
		var k = 256	
		game.decimalize.times ++	
		if(game.decimalize.currentTime <= 600) giveAchieve('ach65')	
		game.decimalize.currentTime = 0	
		game.decimalize.decimals = game.decimalize.decimals.add(Math.floor(Math.pow(2,game.number.log(2)/k - 3)))	
		game.decimalize.totalDecimals = game.decimalize.totalDecimals.add(Math.floor(Math.pow(2,game.number.log(2)/k - 3)))	
		game.number = new Decimal(1000)	
		for(i=1;i<=6;i++) {	
			game['upgrades'+i] = []	
			game['gen'+i] = reset()['gen'+i]	
		}	
		game.synergies = []	
		game.negative = reset().negative	
		game.thebutton = reset().thebutton	
		update('decimals',formatDecimal(game.decimalize.decimals))	
		show('nav2')	
	}	
}	
//saving stuff	
function save() {	
	localStorage.setItem('limitedIncrementalSave',btoa(JSON.stringify(game)))	
}	
function load(save) {	
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
		game.possibleUps = reset().possibleUps	
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
	if(game.achievements === undefined) game.achievements = []	
	if(game.timePlayed === undefined) game.timePlayed = 0	
	if(game.newsSeen === undefined) game.newsSeen = 0	
	if(game.theme === undefined) game.theme = 'dark'	
	if(game.negative.upgrades === []) {	
		game.negative.upgrades = {	
			one:0,	
			two:0,	
			three:0,	
			four:0,	
		}	
	}	
	if(game.negative.upgrades.onePower === undefined) {	
		game.negative.upgrades.onePower = 1	
		game.negative.upgrades.twoPower = 1	
	}	
	if(game.negative.upgrades.threePower === undefined) {	
		game.negative.upgrades.threePower = 1.025	
		game.negative.upgrades.fourPower = 2	
	}	
	if(game.notation === undefined) game.notation = 'standard'	
	if(game.thebutton === undefined) {	
		game.thebutton = {	
			mult:1,	
			cooldown:0,	
			baseCooldown:10,	
			baseMult:1.1,	
			clicks:0,	
		}	
	}	
	if(game.standardTime === undefined) game.standardTime = 0	
	game.number = new Decimal(game.number)	
	for(i=1;i<8;i++) {	
		game['gen'+i].cost = new Decimal(game['gen'+i].cost)	
		game['gen'+i].actualCost = new Decimal(game['gen'+i].actualCost)	
		game['gen'+i].amt = new Decimal(game['gen'+i].amt)	
	}	
	game.negative.cost = new Decimal(game.negative.cost)	
	if(game.negative.upgrades.total == undefined) game.negative.upgrades.total = game.negative.upgrades.one + game.negative.upgrades.two + game.negative.upgrades.three + game.negative.upgrades.four	
	if(game.decimalize == undefined) game.decimalize = reset().decimalize	
	if(game.decimalize.currentTime == undefined) {	
		game.decimalize.currentTime = 0	
		game.decimalize.totalDecimals = game.decimalize.decimals	
		game.decimalize.upgrades = reset().decimalize.upgrades	
	}	
	if(game.gen7 == undefined) game.gen7 = reset().gen7	
	if(game.prestigeDims == undefined) game.prestigeDims = reset().prestigeDims	
	if(game.prestigeDims.points == undefined) game.prestigeDims.points = new Decimal(0)	
	game.prestigeDims.points = new Decimal(game.prestigeDims.points)	
	game.prestigeDims.dim1.cost = new Decimal(game.prestigeDims.dim1.cost)	
	game.prestigeDims.dim1.amt = new Decimal(game.prestigeDims.dim1.amt)	
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
//secret dev stuff	
function maxUpgrades() {	
	for(i=0;i<game.possibleUps.length;i++) {	
		buyUp(game.possibleUps[i],String(game.possibleUps[i]).length)	
	}	
}
