var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");


//------------------------------------------------------------------------------------------------------------
//---------------------------------------------Construction du sol--------------------------------------------
//------------------------------------------------------------------------------------------------------------

// Affiche la glace (le sol) sur tout le canvas
var drawBeton = function () {
    for(var j=0;j<8;j++) {
		for(var i=0;i<6;i++){
            context.drawImage(beton,0,0,225,225,100*i,100*j,100,100);
        }    
    }    
};


//------------------------------------------------------------------------------------------------------------
//--------------------------------------------Affichage des troupes-------------------------------------------
//------------------------------------------------------------------------------------------------------------

// Affiche toutes les troupes de la liste entrée en paramètre
var drawUnits = function(units){
	units.forEach(function(unit){
		if (unit.type=="trooper"){
			drawTieFighter(unit);
			drawTrooper(unit);
			drawHealthBar(unit);
		}
		if (unit.type=="jedi"){
			drawXwing(unit);
			drawJedi(unit);
			drawHealthBar(unit);
		}
		if (unit.type=="vador" ){
			drawDestroyer(unit);
			drawVador(unit);
			drawHealthBar(unit);
		}
		if (unit.type=="droid" ){
			drawMultiTroop(unit);
			drawDroid(unit);
			drawHealthBar(unit);
		}
	});
}

// Affiche le trooper passé en paramètre aux coordonnées qui lui sont propres 
// lors de sa déclaration
var drawTrooper = function(trooper){
	context.drawImage(trooper["imTrooper"],trooper["sx"],trooper["sy"],76,115,trooper["x"],trooper["y"],70,100);
};

// Affiche Vador passé en paramètre aux coordonnées qui lui sont propres 
// lors de sa déclaration
var drawVador = function(vador){
	context.drawImage(vador["imVador"],vador["sx"],vador["sy"],80,100,vador["x"],vador["y"],80,100);
};

// Affiche un jedi passé en paramètre aux coordonnées qui lui sont propres 
// lors de sa déclaration
var drawJedi = function(jedi){
	context.drawImage(jedi["imJedi"],jedi["sx"],jedi["sy"],76,115,jedi["x"],jedi["y"],70,100);
};

// Affiche un droid passé en paramètre aux coordonnées qui lui sont propres 
// lors de sa déclaration
var drawDroid = function(droid){
	context.drawImage(droid["imDroid"],droid["sx"],droid["sy"],95,285,droid["x"],droid["y"],33,100);
};


//------------------------------------------------------------------------------------------------------------
//------------------------------------Affichage des vaisseaux des troupes-------------------------------------
//------------------------------------------------------------------------------------------------------------

// Affiche le tieFighter associé au trooper passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawTieFighter = function(trooper){
	context.drawImage(trooper["imTieFighter"],0,0,810,984,trooper["tieFighterX"],trooper["tieFighterY"]-20,120,120);
};

// Affiche le tieFighter associé au trooper passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawDestroyer = function(vador){
	context.drawImage(vador["imDestroyer"],0,0,640,453,vador["destroyerX"],vador["destroyerY"]-80,150,150);
};

// Affiche le X-Wing associé au jedi passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawXwing = function(jedi){
	context.drawImage(jedi["imXwing"],0,0,604,450,jedi["xwingX"],jedi["xwingY"]-20,130,130);
};

// Affiche le vehicule multiTroop associé au droid passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawMultiTroop = function(droid){
	context.drawImage(droid["imMultiTroop"],0,0,459,279,droid["multiTroopX"],droid["multiTroopY"]-20,100,100);
};


//------------------------------------------------------------------------------------------------------------
//--------------------------------------------Animation des troupes-------------------------------------------
//------------------------------------------------------------------------------------------------------------

// Gère le choix de l'image du trooper pour faire l'animation
function animationTrooper(trooper){
	if (trooper["sx"]==304){
		trooper["sx"]=-76;
	}
	trooper["sx"]+=76;
}

// Gère le choix de l'image de Vador pour faire l'animation
function animationVador(vador){

	if (vador["sx"]==240){
		vador["sx"]=-80;
	}
	vador.sx+=80;
}

// Gère le choix de l'image du Jedi pour faire l'animation
function animationJedi(jedi){
	if (jedi["sx"]==228){
		jedi["sx"]=-76;
	}
	jedi["sx"]+=76;
}

// Gère le choix de l'image du droid pour faire l'animation
function animationDroid(droid){
	if (droid["sx"]==285){
		droid["sx"]=-95;
	}
	droid["sx"]+=95;
}


//------------------------------------------------------------------------------------------------------------
//-------------------------------------Gestion des apparitions des troupes------------------------------------
//------------------------------------------------------------------------------------------------------------

// Variables globales
var popUpUnits;

var testTroopers=false;
var testJedis=false;
var testVador=false;
var nbTypesUnit=1;
var nbTypesUnitTestTroopers=false;
var nbTypesUnitTestJedis=false;
var changeFreqTest=false;

var popUp = function(units){
	firstSong.play();
	firstSong.loop=true;
	popUpControl2000=setInterval(function(){
		var choix = Math.floor((Math.random() * nbTypesUnit) + 1); //nb random entre 1 et 3
		console.log("time " + time);
		//console.log("math.floor"+Math.floor(time));
		console.log("nbtype "+nbTypesUnit);
		console.log(choix);
		if (Math.floor(time)<=170 && nbTypesUnitTestTroopers==false){
			testTroopers=true;
			nbTypesUnit+=1;
			nbTypesUnitTestTroopers=true;
		}
		if (Math.floor(time)<=100 && nbTypesUnitTestJedis==false){
			testJedis=true;
			nbTypesUnit+=1;
			nbTypesUnitTestJedis=true;
		}
		if (Math.floor(time)<=60){
			testVador=true;
			nbTypesUnitTest=true;
			changeFreqTest=true;
			clearInterval(popUpControl2000);
		}
		//popUpTroopers au bout de 30s de jeu
		if (choix ==2 && testTroopers){
			var xTrooper=Math.floor(Math.random() * 500)+50;
			var yTrooper=Math.floor(Math.random() * 50)+50;
			var troop=new Trooper(xTrooper,yTrooper);
			units.push(troop);
			drawTieFighter(troop);
			drawTrooper(troop);
			drawHealthBar(troop);
			setTimeout(function(){
				troop["imTieFighter"].src="beton.png";
			},3000);
		}
		
		//popUpJedis au bout de 1min40s=100s de jeu
		if (choix==3 && testJedis){
			var xJedi=Math.floor(Math.random() * 500)+50;
			var yJedi=Math.floor(Math.random() * 50)+50;
			var jedi=new Jedi(xJedi,yJedi);
			units.push(jedi);
			drawXwing(jedi);
			drawJedi(jedi);
			drawHealthBar(jedi);
			setTimeout(function(){
				jedi["imXwing"].src="beton.png";
			},3000);
		}

		//popUpVador au bout de 2min20=140s de jeu
		if (testVador){
			var xVador=Math.floor(Math.random() * 500)+50;
			var yVador=Math.floor(Math.random() * 50)+50;
			var vador=new Vador(xVador,yVador);
			units.push(vador);
			drawDestroyer(vador);
			drawVador(vador);
			drawHealthBar(vador);
			firstSong.pause();
			vadorTheme.play();
			setTimeout(function(){
				vador["imDestroyer"].src="beton.png";
			},5000);
			testVador=false;
		}
		//popUpDroids
		if (choix==1) {
			var xDroid=Math.floor(Math.random() * 510)+30;
			var yDroid=Math.floor(Math.random() * 70)+30;
			var droid=new Droid(xDroid,yDroid);
			units.push(droid);
			drawMultiTroop(droid);
			drawDroid(droid);
			drawHealthBar(droid);
			setTimeout(function(){
				droid["imMultiTroop"].src="beton.png";
			},3000);
		}
	}, 2000)
	
	


	//refresh toutes les 0.1s
	popUpUnits = setInterval(function(){
		
		//si le changement de frequence est fait
		if (changeFreqTest){
			changeFreqTest=false;
			clearInterval(popUpControl2000);
			popUpControl1000=setInterval(function(){
				var choix = Math.floor((Math.random() * nbTypesUnit) + 1);
				console.log("time " + time);
				console.log(choix);
				if (Math.floor(time)==198){
					testTroopers=true;
					nbTypesUnit+=1;
				}
				if (Math.floor(time)==190){
					testJedis=true;
					nbTypesUnit+=1;
				}
				if (Math.floor(time)==190){
					testVador=true;
					changeFreqTest=true;
					clearInterval(popUpControl2000)
				}
				//popUpTroopers 
				if (choix ==2 && testTroopers){
					var xTrooper=Math.floor(Math.random() * 500)+50;
					var yTrooper=Math.floor(Math.random() * 50)+50;
					var troop=new Trooper(xTrooper,yTrooper);
					units.push(troop);
					drawTieFighter(troop);
					drawTrooper(troop);
					drawHealthBar(troop);
					setTimeout(function(){
						troop["imTieFighter"].src="beton.png";
					},2000);
				}
				
				//popUpJedis 
				if (choix==3 && testJedis){
					var xJedi=Math.floor(Math.random() * 500)+50;
					var yJedi=Math.floor(Math.random() * 50)+50;
					var jedi=new Jedi(xJedi,yJedi);
					units.push(jedi);
					drawXwing(jedi);
					drawJedi(jedi);
					drawHealthBar(jedi);
					setTimeout(function(){
						jedi["imXwing"].src="beton.png";
					},2000);
				}

				//popUpVador 
				if (testVador){
					var xVador=Math.floor(Math.random() * 500)+50;
					var yVador=Math.floor(Math.random() * 50)+50;
					var vador=new Vador(xVador,yVador);
					units.push(vador);
					drawDestroyer(vador);
					drawVador(vador);
					drawHealthBar(vador);
					setTimeout(function(){
						vador["imDestroyer"].src="beton.png";
					},5000);
					testVador=false;
				}
				//popUpDroids
				if (choix==1){
					var xDroid=Math.floor(Math.random() * 510)+30;
					var yDroid=Math.floor(Math.random() * 70)+30;
					var droid=new Droid(xDroid,yDroid);
					units.push(droid);
					drawMultiTroop(droid);
					drawDroid(droid);
					drawHealthBar(droid);
					setTimeout(function(){
						droid["imMultiTroop"].src="beton.png";
					},1500);
				}
			}, 1000)
		}
		

		units.forEach(function(unit){
			if (unit.type=="vador"){
				unit["y"]=unit["y"]+1;
				drawDestroyer(unit);
				drawVador(unit);
				drawHealthBar(unit);
				animationVador(unit);
			}
			if (unit.type=="jedi"){
				unit["y"]=unit["y"]+3;
				drawXwing(unit);
				drawJedi(unit);
				drawHealthBar(unit);
				animationJedi(unit);
			}
			if (unit.type=="trooper"){
				unit["y"]=unit["y"]+4;
				drawTieFighter(unit);
				drawTrooper(unit);
				drawHealthBar(unit);
				animationTrooper(unit);
			}
			if (unit.type=="droid"){
				unit["y"]=unit["y"]+8;
				drawMultiTroop(unit);
				drawDroid(unit);
				drawHealthBar(unit);
				animationDroid(unit);
			}
		})
		time=time-0.1;
		
		drawBeton();
		drawUnits(units);
		display(); 
		if (time<=0){
			win();
		}
	},100);
	return units;
}


//------------------------------------------------------------------------------------------------------------
//-------------------------------Utilisation du clic pour supprimer les troupes-------------------------------
//------------------------------------------------------------------------------------------------------------

// Variables globales
var Xcurseur = 0;
var Ycurseur = 0;
document.onclick = position;

// Retourne la position du curseur au clic et appelle la fonction "collision()"
function position(evt) {

	if (soundBlaster.currentTime!=0){
		soundBlaster.currentTime=0;
	}
	soundBlaster.play();
	var XYrect = canvas.getBoundingClientRect(); 
  	if (navigator.appName=="Microsoft Internet Explorer") {
		Xcurseur = evt.x + document.body.scrollLeft - XYrect.left;
  		Ycurseur = evt.y + document.body.scrollTop - XYrect.top;
  	}else {
		if(!evt) evt = window.event;    
		Xcurseur = evt.clientX - XYrect.left;
   		Ycurseur = evt.clientY - XYrect.top;
	}
	collision(Xcurseur,Ycurseur,unitsList);
};

// Fonction qui appelle la fonction "healthBarControl" si l'utilisateur clic sur un personnage. Permet de dire qu'il 
// y a une collision.
function collision(Xcurseur, Ycurseur, units){
	for(var i = 0; i < units.length ; i++){
		// Le clic est centré donc il faut rajouter le centrage dans les conditions
		if ((units[i].x <= Xcurseur + 30) && (units[i].x >= Xcurseur - 30) && (units[i].y <= Ycurseur + 5) && (units[i].y >= Ycurseur - 35)){
			blood(units,i);
			healthBarControl(units,i);
		}
		if (i == units.length) i = 0;
	}
};

//Met les personnages en rouge
function blood(units,i){
	if(units[i]["type"] == "trooper"){
		units[i]["imTrooper"].src = "trooperRed.png";
		setTimeout(function(){
			units[i]["imTrooper"].src = "trooper.png";
		},100);
	}
	if(units[i]["type"] == "jedi"){
		units[i]["imJedi"].src = "jediRed.png";
		setTimeout(function(){
			units[i]["imJedi"].src = "jedi.png";
		},100);
	}
	if(units[i]["type"] == "vador"){
		units[i]["imVador"].src = "vadorRed.png";
		setTimeout(function(){
			units[i]["imVador"].src = "vador.png";
		},100);
	}
}


//------------------------------------------------------------------------------------------------------------
//-----------------------------------------Gestion de la barre de vie-----------------------------------------
//------------------------------------------------------------------------------------------------------------

//Création d'une barre de vie
var drawHealthBar = function(unit){
	if (unit.type == "trooper"){
		context.drawImage(unit["imHealthBar"],0,0,153,27,unit["x"],unit["y"]-5 ,70,4);
	}
	if (unit.type == "droid"){
		context.drawImage(unit["imHealthBar"],0,0,153,27,unit["x"],unit["y"]-5 ,33,4);
	}
	if (unit.type == "vador"){
		context.drawImage(unit["imHealthBar"],0,0,153,27,unit["x"],unit["y"]-5 ,70,4);
	}
	if (unit.type == "jedi"){
		context.drawImage(unit["imHealthBar"],0,0,153,27,unit["x"],unit["y"]-5 ,70,4);
	}
}

// Change la barre de vie suivant la vie restante du personnage
function healthBarControl(units,i){
	units[i]["hp"] -= 1;
	if(units[i]["hp"] == 0){
		death(units,i);
	}
	if(units[i]["type"] == "trooper")
	{
		if(units[i]["hp"] == 1){
			units[i]["imHealthBar"].src = "healthMid.png";
		}
	}
	if(units[i]["type"] == "jedi"){
		if(units[i]["hp"] == 2){
			units[i]["imHealthBar"].src = "health2Thirds.png";
		}
		if(units[i]["hp"] == 1){
			units[i]["imHealthBar"].src = "healthQuarter.png";
		}
	}
	if(units[i]["type"] == "vador"){
		if(units[i]["hp"] == 24){
			units[i]["imHealthBar"].src = "health3Quarters.png";
		}
		if(units[i]["hp"] == 20){
			units[i]["imHealthBar"].src = "health2Thirds.png";
		}
		if(units[i]["hp"] == 13){
			units[i]["imHealthBar"].src = "healthMid.png";
		}
		if(units[i]["hp"] == 5){
			units[i]["imHealthBar"].src = "healthQuarter.png";
		}
	}
}


//------------------------------------------------------------------------------------------------------------
//---------------------------Suppression des troupes, gestion du score et de la vie---------------------------
//------------------------------------------------------------------------------------------------------------

// Variable globale
var life = 10;

// Fonction qui permet de supprimer les troupes lorsqu'elles ont dépassé le canvas
function deleteUnit(units){
	setInterval(function(){
		var i=0;
		for (i;i<units.length;i++){
			if (units[i].y>800){
					units.splice(i,1);
					life -= 1;
					if (life == 0){
						loose();
					}
				}
			}
	},100);
	return units;
}

// Gestion du score en fonction des personnages éliminés
var score = 0;
function death(units,i){
	if(units[i]["type"] == "droid"){
		score += 1;
	}
	if(units[i]["type"] == "trooper"){
		score += 3;
	}
	if(units[i]["type"] == "jedi"){
		score += 5;
	}
	if(units[i]["type"] == "vador"){
		score += 30;
		vadorTheme.pause();
		vadorTheme.currentTime=0;
		firstSong.play();
	}
	units.splice(i,1);
}


//------------------------------------------------------------------------------------------------------------
//------------------------------Affichage du temps et de la vie et des points---------------------------------
//------------------------------------------------------------------------------------------------------------


//Variable globale
var time=200;
// Affichage du score, de la vie et du temps
function display(){
	context.fillStyle = "white";
	context.font = "bold 15px Calibri,Geneva,Arial";
	context.fillText("Score : " , 5 , 15);
	context.fillText( +score , 60 , 15);
	context.fillText("Life : " , 245 , 15);
	context.fillText(+life , 280 , 15);
	context.fillText("Time : ", 520 , 15);
	context.fillText(+time, 565 , 15);
}




//------------------------------------------------------------------------------------------------------------
//---------------------------------Gestion de la victoire et de la défaite------------------------------------
//------------------------------------------------------------------------------------------------------------

// Fonction qui gère la défaite
function loose(){
	stop();
	vadorTheme.pause();
	firstSong.pause();
	defeatSong1.play();
	setTimeout(function(){
		defeatSong2.play();
		defeatSong2.loop=true;
	},3000);  
	context.drawImage(youLoose, 0,0,600,800);
	context.fillText("Score : " , 5 , 15);
	context.fillText( +score , 60 , 15);
	oneGame=false;
}

//Fonction qui gère la victoire
function win(){
	stop();
	time=0;
	vadorTheme.pause();
	firstSong.pause();
	winSong.play();
	context.drawImage(youWin, 0,0,369,532,0,0,600,800);
	context.fillText("Score : " , 5 , 15);
	context.fillText( +score , 60 , 15);
	oneGame=false;
}




//------------------------------------------------------------------------------------------------------------
//-----------------------------------------Mettre le jeu en pause---------------------------------------------
//------------------------------------------------------------------------------------------------------------



//Fonction qui stoppe les setinterval
function stop(){
	clearInterval(popUpUnits);
	if (time<=60){
		clearInterval(popUpControl1000);
	}
	if (time>60){
		clearInterval(popUpControl2000);

	}
}

function played(){
	setInterval(popUp(unitsList));
	function position(evt) {

	if (soundBlaster.currentTime!=0){
		soundBlaster.currentTime=0;
	}
	soundBlaster.play();
	var XYrect = canvas.getBoundingClientRect(); 
  	if (navigator.appName=="Microsoft Internet Explorer") {
		Xcurseur = evt.x + document.body.scrollLeft - XYrect.left;
  		Ycurseur = evt.y + document.body.scrollTop - XYrect.top;
  	}else {
		if(!evt) evt = window.event;    
		Xcurseur = evt.clientX - XYrect.left;
   		Ycurseur = evt.clientY - XYrect.top;
	}
	collision(Xcurseur,Ycurseur,unitsList);
};
}



//------------------------------------------------------------------------------------------------------------
//-----------------------------------Constructeurs des troupes et vaisseaux-----------------------------------
//------------------------------------------------------------------------------------------------------------

// Constructeur de l'objet trooper. Ses paramètres (x,y) sont les 
// coordonnées de son coin supérieur gauche. sx permet de gérer l'animation
function Trooper (x, y){
	this.type="trooper";
	this.imTrooper=new Image();
	this["imTrooper"].src="trooper.png";
	this.imVador=new Image();
	this["imVador"].src="vador.png";
	this.imJedi=new Image();
	this["imJedi"].src="jedi.png";
	this.imDroid=new Image();
	this["imDroid"].src="droid.png"
	this.imTieFighter=new Image();
	this["imTieFighter"].src="tieFighter.png";
	this.imDestroyer= new Image();
	this["imDestroyer"].src="destroyer.png";
	this.imXwing=new Image();
	this["imXwing"].src="xwing.png";
	this.imMultiTroop=new Image();
	this["imMultiTroop"].src="multiTroop.png";
	this.imHealthBar = new Image();
	this["imHealthBar"].src = "healthFull.png";
	this.x=x;
	this.y=y;
	this.sx=0;
	this.sy=0;
	this.tieFighterX=x;
	this.tieFighterY=y;
	this.hp=2;
}

// Constructeur de l'objet Vador. Ses paramètres (x,y) sont les 
// coordonnées de son coin supérieur gauche. sx permet de gérer l'animation
function Vador (x, y){
	this.type="vador";
	this.imTrooper=new Image();
	this["imTrooper"].src="trooper.png";
	this.imVador=new Image();
	this["imVador"].src="vador.png";
	this.imJedi=new Image();
	this["imJedi"].src="jedi.png";
	this.imDroid=new Image();
	this["imDroid"].src="droid.png"
	this.imTieFighter=new Image();
	this["imTieFighter"].src="tieFighter.png";
	this.imDestroyer= new Image();
	this["imDestroyer"].src="destroyer.png";
	this.imXwing=new Image();
	this["imXwing"].src="xwing.png";
	this.imMultiTroop=new Image();
	this["imMultiTroop"].src="multiTroop.png";
	this.imHealthBar = new Image();
	this["imHealthBar"].src = "healthFull.png";
	this.x=x;
	this.y=y;
	this.sx=0;
	this.sy=0;
	this.destroyerX=x;
	this.destroyerY=y;
	this.hp=25;
	this.frame=0;
}

// Constructeur de l'objet Jedi. Ses paramètres (x,y) sont les 
// coordonnées de son coin supérieur gauche. sx permet de gérer l'animation
function Jedi (x, y){
	this.type="jedi";
	this.imTrooper=new Image();
	this["imTrooper"].src="trooper.png";
	this.imVador=new Image();
	this["imVador"].src="vador.png";
	this.imJedi=new Image();
	this["imJedi"].src="jedi.png";
	this.imDroid=new Image();
	this["imDroid"].src="droid.png"
	this.imTieFighter=new Image();
	this["imTieFighter"].src="tieFighter.png";
	this.imDestroyer= new Image();
	this["imDestroyer"].src="destroyer.png";
	this.imXwing=new Image();
	this["imXwing"].src="xwing.png";
	this.imMultiTroop=new Image();
	this["imMultiTroop"].src="multiTroop.png";
	this.imHealthBar = new Image();
	this["imHealthBar"].src = "healthFull.png";
	this.x=x;
	this.y=y;
	this.sx=0;
	this.sy=0;
	this.xwingX=x;
	this.xwingY=y;
	this.hp=3;
	this.frame=0;
}

// Constructeur de l'objet Droid. Ses paramètres (x,y) sont les 
// coordonnées de son coin supérieur gauche. sx permet de gérer l'animation
function Droid (x, y){
	this.type="droid";
	this.imTrooper=new Image();
	this["imTrooper"].src="trooper.png";
	this.imVador=new Image();
	this["imVador"].src="vador.png";
	this.imJedi=new Image();
	this["imJedi"].src="jedi.png";
	this.imDroid=new Image();
	this["imDroid"].src="droid.png"
	this.imTieFighter=new Image();
	this["imTieFighter"].src="tieFighter.png";
	this.imDestroyer= new Image();
	this["imDestroyer"].src="destroyer.png";
	this.imXwing=new Image();
	this["imXwing"].src="xwing.png";
	this.imMultiTroop=new Image();
	this["imMultiTroop"].src="multiTroop.png";
	this.imHealthBar = new Image();
	this["imHealthBar"].src = "healthFull.png";
	this.x=x;
	this.y=y;
	this.sx=0;
	this.sy=0;
	this.multiTroopX=x;
	this.multiTroopY=y;
	this.hp=1;
	this.frame=0;
}


//------------------SONS------------

var soundBlaster = new Audio("blaster.mp3");
var defeatSong1= new Audio("defeatSong1.mp3");
var defeatSong2= new Audio("defeatSong2.mp3");
var firstSong=new Audio("firstSong.mp3");
var vadorTheme= new Audio("vadorTheme.mp3");
var menuSong= new Audio("accueil.mp3");
var winSong= new Audio("cantina.mp3");

//------------------MENU----------
function menu(){
	menuSong.play();
	menuSong.loop=true;
 	context.drawImage(accueil,0,0,600,800);
 	var start = document.addEventListener('keypress', (event) => {
 		console.log(event.which);
		if(event.which == 13 && oneGame==false){
			oneGame=true;
			init();
			startGame();
		}
	})
}

function init(){

	testTroopers=false;
	testJedis=false;
	testVador=false;
	nbTypesUnit=1;
	nbTypesUnitTestTroopers=false;
	nbTypesUnitTestJedis=false;
	changeFreqTest=false;

	life = 10;
	score = 0;
	time = 200;
}

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------DEBUT DU JEU------------------------------------------------
//------------------------------------------------------------------------------------------------------------

// Déclaration de l'image du sol
var beton = new Image();
beton.src="beton.png";
//declaration image d'accueil
var accueil= new Image();
accueil.src="accueil.jpg";

//declaration image youLoose
var youLoose= new Image();
youLoose.src="youLoose.png";
//declaration image youLoose
var youWin= new Image();
youWin.src="youWin.jpg";
//var de test pour lancer qu'un seul jeu a la fois
var oneGame=false;

// Démarrage du jeu après 0,5s pour prendre le temps de charger les images
setTimeout(function(){
	menu();
	}, 500);

// Fonction principale du jeu
function startGame(){
	menuSong.pause();
	defeatSong1.pause();
	defeatSong2.pause();
	winSong.pause();
	drawBeton();
	unitsList=[];
	init();
	unitsList=popUp(unitsList);
	unitsist=deleteUnit(unitsList);
}