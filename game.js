var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");


//------------------------------------------------------------------------------------------------------------
//---------------------------------------------Construction du sol--------------------------------------------
//------------------------------------------------------------------------------------------------------------

// Affiche la glace (le sol) sur tout le canvas
var drawIce = function () {
    for(var j=0;j<16;j++)
    {
        for(var i=0;i<12;i++)
        {
            context.drawImage(ice,0,0,100,150,50*i,50*j,50,50);
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
	context.drawImage(trooper["imTrooper"],trooper["sx"],0,156,180,trooper["x"],trooper["y"]+20,50,50);
};

// Affiche Vador passé en paramètre aux coordonnées qui lui sont propres 
// lors de sa déclaration
var drawVador = function(vador){
	context.drawImage(vador["imVador"],vador["sx"],vador["sy"],156,140,vador["x"],vador["y"]+20,70,70);
};

// Affiche un jedi passé en paramètre aux coordonnées qui lui sont propres 
// lors de sa déclaration
var drawJedi = function(jedi){
	context.drawImage(jedi["imJedi"],jedi["sx"],jedi["sy"],185,180,jedi["x"],jedi["y"]+10,60,60);
};

// Affiche un droid passé en paramètre aux coordonnées qui lui sont propres 
// lors de sa déclaration
var drawDroid = function(droid){
	context.drawImage(droid["imDroid"],droid["sx"],droid["sy"],185,160,droid["x"],droid["y"]+10,40,40);
};


//------------------------------------------------------------------------------------------------------------
//------------------------------------Affichage des vaisseaux des troupes-------------------------------------
//------------------------------------------------------------------------------------------------------------

// Affiche le tieFighter associé au trooper passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawTieFighter = function(trooper){
	context.drawImage(trooper["imTieFighter"],0,0,810,984,trooper["tieFighterX"],trooper["tieFighterY"],50,50);
};

// Affiche le tieFighter associé au trooper passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawDestroyer = function(vador){
	context.drawImage(vador["imDestroyer"],0,0,640,453,vador["destroyerX"],vador["destroyerY"]-20,70,70);
};

// Affiche le X-Wing associé au jedi passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawXwing = function(jedi){
	context.drawImage(jedi["imXwing"],0,0,604,450,jedi["xwingX"],jedi["xwingY"]-20,60,60);
};

// Affiche le vehicule multiTroop associé au droid passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawMultiTroop = function(droid){
	context.drawImage(droid["imMultiTroop"],0,0,459,279,droid["multiTroopX"],droid["multiTroopY"]-20,50,50);
};


//------------------------------------------------------------------------------------------------------------
//--------------------------------------------Animation des troupes-------------------------------------------
//------------------------------------------------------------------------------------------------------------

// Gère le choix de l'image du trooper pour faire l'animation
function animationTrooper(trooper){
	if (trooper["sx"]==624){
		trooper["sx"]=-156;
	}
	trooper["sx"]+=156;
}

// Gère le choix de l'image de Vador pour faire l'animation
function animationVador(vador){
	if (vador["sx"]==600){
		vador["sx"]=-150;
	}
	vador.sx+=150;
	// le code en dessous fait marcher Vador plus doucement
	//mais fait clignoter Vador de temps en temps
	/*
	if (vador["frame"]%10==0){
		vador["sx"]+=150;
	}
	vador["frame"]++;
	*/
}

// Gère le choix de l'image du Jedi pour faire l'animation
function animationJedi(jedi){
	if (jedi["sx"]==555){
		jedi["sx"]=-185;
	}
	jedi["sx"]+=185;
}

// Gère le choix de l'image du droid pour faire l'animation
function animationDroid(droid){
	if (droid["sx"]==600){
		droid["sx"]=-150;
	}
	droid["sx"]+=150;
}


//------------------------------------------------------------------------------------------------------------
//-------------------------------------Gestion des apparitions des troupes------------------------------------
//------------------------------------------------------------------------------------------------------------

// Fait appraître les vaisseaux (immobiles). Au bout d'une 
// seconde le vaisseau disparait et le personnage avance.
var popUp = function(units){
	//popUpVador
	var xVador=Math.floor(Math.random() * 551);
	var yVador=Math.floor(Math.random() * 101);
	var vador=new Vador(xVador,yVador);
	units.push(vador);
	drawDestroyer(vador);
	drawVador(vador);
	drawHealthBar(vador);
	setTimeout(function(){
		vador["imDestroyer"].src="ice.jpg";
	},5000);
	
	//popUpDroids
	setInterval(function(){
			var xDroid=Math.floor(Math.random() * 551);
			var yDroid=Math.floor(Math.random() * 101);
			var droid=new Droid(xDroid,yDroid);
			units.push(droid);
			drawMultiTroop(droid);
			drawDroid(droid);
			drawHealthBar(droid);
			setTimeout(function(){
				droid["imMultiTroop"].src="ice.jpg";
		},1500);
	},1800);

	//popUpTroopers
	setInterval(function(){
			var xTrooper=Math.floor(Math.random() * 551);
			var yTrooper=Math.floor(Math.random() * 101);
			var troop=new Trooper(xTrooper,yTrooper);
			units.push(troop);
			drawTieFighter(troop);
			drawTrooper(troop);
			drawHealthBar(troop);
			setTimeout(function(){
				troop["imTieFighter"].src="ice.jpg";
		},1500);
	},2200);

	//popUpJedis
	setInterval(function(){
			var xJedi=Math.floor(Math.random() * 551);
			var yJedi=Math.floor(Math.random() * 101);
			var jedi=new Jedi(xJedi,yJedi);
			units.push(jedi);
			drawXwing(jedi);
			drawJedi(jedi);
			drawHealthBar(jedi);
			setTimeout(function(){
				jedi["imXwing"].src="ice.jpg";
		},2000);
	},3000);

	//refresh toutes les 0.1s
	setTimeout(function(){
		setInterval(function(){
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
					unit["y"]=unit["y"]+5;
					drawMultiTroop(unit);
					drawDroid(unit);
					drawHealthBar(unit);
					animationDroid(unit);
				}
			})
			drawIce();
			drawUnits(units);
			display(score);
			console.log(units);
		},100);
	},2000);
	return units;
}


//------------------------------------------------------------------------------------------------------------
//-------------------------------------------Suppression des troupes------------------------------------------
//------------------------------------------------------------------------------------------------------------

// Fonction qui permet de supprimer les troupes lorsqu'elles ont dépassé le canvas
function deleteUnit(units){
	setInterval(function(){
		var i=0;
		for (i;i<units.length;i++){
			if (units[i].y>800){
					units.splice(i,1);
				}
			}
	},2500);
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
function position (evt) {
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
		if ((units[i].x <= Xcurseur + 20) && (units[i].x >= Xcurseur - 40) && (units[i].y <= Ycurseur) && (units[i].y >= Ycurseur - 65)){
			healthBarControl(units,i);
		}
		if (i == units.length) i = 0;
	}
};


//------------------------------------------------------------------------------------------------------------
//-----------------------------------------Gestion de la barre de vie-----------------------------------------
//------------------------------------------------------------------------------------------------------------

//Création d'une barre de vie
var drawHealthBar = function(unit){
	context.drawImage(unit["imHealthBar"],0,0,153,27,unit["x"],unit["y"]+5,40,4);
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
			units[i]["imHealthBar"].src="healthMid.png";
		}
	}
	if(units[i]["type"] == "jedi"){
		if(units[i]["hp"] == 2){
			units[i]["imHealthBar"].src="health2Thirds.png";
		}
		if(units[i]["hp"] == 1){
			units[i]["imHealthBar"].src="healthQuarter.png";
		}
	}
	if(units[i]["type"] == "vador"){
		if(units[i]["hp"] == 24){
			units[i]["imHealthBar"].src="health3Quarters.png";
		}
		if(units[i]["hp"] == 20){
			units[i]["imHealthBar"].src="health2Thirds.png";
		}
		if(units[i]["hp"] == 13){
			units[i]["imHealthBar"].src="healthMid.png";
		}
		if(units[i]["hp"] == 5){
			units[i]["imHealthBar"].src="healthQuarter.png";
		}
	}
}

//Gestion du score en fonction des personnages éliminés
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
	}
	units.splice(i,1);
}


//------------------------------------------------------------------------------------------------------------
//-------------------------------------Affichage du temps et des points---------------------------------------
//------------------------------------------------------------------------------------------------------------

// Affichage du score, de la vie et du temps
function display(score){
	context.fillStyle = "white";
	context.font = "bold 15px Calibri,Geneva,Arial";
	context.fillText("Score : ",5, 15);
	context.fillText( +score ,60, 15);
	context.fillText("Life : ",245, 15);
	context.fillText("Time : ",500, 15);
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
	this.sy=300;
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
	this.sy=380;
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


//------------------------------------------------------------------------------------------------------------
//------------------------------------------------DEBUT DU JEU------------------------------------------------
//------------------------------------------------------------------------------------------------------------

// Déclaration de l'image du sol
var ice=new Image();
	ice.src="ice.jpg";

// Démarrage du jeu après 0,5s pour prendre le temps de charger les images
setTimeout(function(){
	startGame();
	}, 500);

// Fonction principale du jeu
function startGame(){
	drawIce();
	unitsList = [];
	unitsList = popUp(unitsList);
	unitsList = deleteUnit(unitsList);
}