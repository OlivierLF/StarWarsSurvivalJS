var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");


// affiche la glace (le sol) sur tout le canvas
var drawIce = function () {
    for(var j=0;j<16;j++)
    {
        for(var i=0;i<12;i++)
        {
            context.drawImage(ice,0,0,100,150,50*i,50*j,50,50);
        }
    }    
};


//affiche tous les troopers de la liste entrée en paramètre
var drawUnits = function(units){

	units.forEach(function(unit){
		if (unit.type=="trooper"){
			drawTieFighter(unit);
			drawTrooper(unit);
		}
		if (unit.type=="jedi"){
			drawXwing(unit);
			drawJedi(unit);
		}
		if (unit.type=="vador" ){
			drawDestroyer(unit);
			drawVador(unit);
		}
		if (unit.type=="droid" ){
			drawMultiTroop(unit);
			drawDroid(unit);
		}
	});
}
//affiche le trooper passé en paramètre aux coordonnées qui lui sont propres 
//lors de sa déclaration
var drawTrooper = function(trooper){
	context.drawImage(trooper["imTrooper"],trooper["sx"],0,156,180,trooper["x"],trooper["y"]+20,50,50);
};

//affiche Vador passé en paramètre aux coordonnées qui lui sont propres 
//lors de sa déclaration
var drawVador = function(vador){
	context.drawImage(vador["imVador"],vador["sx"],vador["sy"],156,140,vador["x"],vador["y"]+20,70,70);
};

//affiche un jedi passé en paramètre aux coordonnées qui lui sont propres 
//lors de sa déclaration
var drawJedi = function(jedi){
	context.drawImage(jedi["imJedi"],jedi["sx"],jedi["sy"],185,180,jedi["x"],jedi["y"]+10,60,60);
};
//affiche un droid passé en paramètre aux coordonnées qui lui sont propres 
//lors de sa déclaration
var drawDroid = function(droid){
	context.drawImage(droid["imDroid"],droid["sx"],droid["sy"],185,180,droid["x"],droid["y"]+10,40,40);
};




//affiche le tieFighter associé au trooper passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawTieFighter = function(trooper){
	context.drawImage(trooper["imTieFighter"],0,0,810,984,trooper["tieFighterX"],trooper["tieFighterY"],50,50);
};
//affiche le tieFighter associé au trooper passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawDestroyer = function(vador){
	context.drawImage(vador["imDestroyer"],0,0,640,453,vador["destroyerX"],vador["destroyerY"]-20,70,70);
};

//affiche le X-Wing associé au jedi passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawXwing = function(jedi){
	context.drawImage(jedi["imXwing"],0,0,604,450,jedi["xwingX"],jedi["xwingY"]-20,60,60);
};

//affiche le vehicule multiTroop associé au droid passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawMultiTroop = function(droid){
	context.drawImage(droid["imMultiTroop"],0,0,459,279,droid["multiTroopX"],droid["multiTroopY"]-20,50,50);
};

//fait appraître les tieFighters (immobiles). Au bout d'une 
//seconde le tieFighter disparait et le trooper avance.
var popUp = function(units){
	//popUpVador
	var xVador=Math.floor(Math.random() * 551);
	var yVador=Math.floor(Math.random() * 101);
	var vador=new Vador(xVador,yVador);
	units.push(vador);
	drawDestroyer(vador);
	drawVador(vador);
	setTimeout(function(){
		vador["imDestroyer"].src="ice.jpg";
	},5000);
	
	//popUpDroids
	setInterval(function(){
			var xDroid=Math.floor(Math.random() * 551);
			var yDroid=Math.floor(Math.random() * 101);
			var droid=new Droid(xDroid,yDroid);
			units.push(droid);
			drawMultiTroop(droid)
			drawDroid(droid);
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
			drawTieFighter(troop)
			drawTrooper(troop);
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
					animationVador(unit);
				}
				if (unit.type=="jedi"){
					unit["y"]=unit["y"]+3;
					drawXwing(unit);
					drawJedi(unit);
					animationJedi(unit);
				}
				if (unit.type=="trooper"){
					unit["y"]=unit["y"]+4;
					drawTieFighter(unit);
					drawTrooper(unit)
					animationTrooper(unit);
				}
				if (unit.type=="droid"){
					unit["y"]=unit["y"]+5;
					drawMultiTroop(unit);
					drawDroid(unit);
					animationDroid(unit);
				}
			})
			drawIce();
			drawUnits(units);
			console.log(units);
		},100);
	},2000);

	return units;
}

//gère le choix de l'image du trooper pour faire l'animation
function animationTrooper(trooper){
	if (trooper["sx"]==624){
		trooper["sx"]=-156;
	}
	trooper["sx"]+=156;
}
//gère le choix de l'image de Vador pour faire l'animation
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

//gère le chois de l'image du Jedi pour faire l'animation
function animationJedi(jedi){
	if (jedi["sx"]==555){
		jedi["sx"]=-185;
	}
	jedi["sx"]+=185;
}

function animationDroid(droid){
	if (droid["sx"]==600){
		droid["sx"]=-150;
	}
	droid["sx"]+=150;
}

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
	


//Constructeur de l'objet Trooper. Ses paramètres (x,y) sont les 
//coordonnées de son coin supérieur gauche. sx permet de gérer l'animation
function Trooper (x, y){
	this.type="trooper";
	this.imTrooper=new Image();
	this["imTrooper"].src="trooper.png";
	this.imVador=new Image();
	this["imVador"].src="vador.png";
	this.imJedi=new Image();
	this["imJedi"].src="jedi.png";
	this.imTieFighter=new Image();
	this["imTieFighter"].src="tieFighter.png";
	this.imDestroyer= new Image();
	this["imDestroyer"].src="destroyer.png";
	this.imXwing=new Image();
	this["imXwing"].src="xwing.png";
	this.imMultiTroop=new Image();
	this["imMultiTroop"].src="multiTroop.png";
	this.x=x;
	this.y=y;
	this.sx=0;
	this.tieFighterX=x;
	this.tieFighterY=y;
	this.hp=2;
}

//Constructeur de l'objet Vador. Ses paramètres (x,y) sont les 
//coordonnées de son coin supérieur gauche. sx permet de gérer l'animation
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
	this.x=x;
	this.y=y;
	this.sx=0;
	this.sy=300;
	this.destroyerX=x;
	this.destroyerY=y;
	this.hp=25;
	this.frame=0;
}

//Constructeur de l'objet Jedi. Ses paramètres (x,y) sont les 
//coordonnées de son coin supérieur gauche. sx permet de gérer l'animation
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
	this.x=x;
	this.y=y;
	this.sx=0;
	this.sy=380;
	this.xwingX=x;
	this.xwingY=y;
	this.hp=10;
	this.frame=0;
}

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
	this.x=x;
	this.y=y;
	this.sx=0;
	this.sy=0;
	this.multiTroopX=x;
	this.multiTroopY=y;
	this.hp=1;
	this.frame=0;
}



// Gestion du curseur et du click
// Evenement à supprimer quand le jeu fonctionnera
//$(canvas).click(function() {
//    alert("Vous m'avez cliqué !");
//});

// Test pour trouver où se situe la souris
//document.addEventListener('mousemove', function(e) {
//    cv.innerHTML = 'Position X : ' + e.clientX + 'px<br />Position Y : ' + e.clientY + 'px';
//});

// Affiche une alerte lorsqu'on est sur le canvas
//$(cv).mousemove(function(event) {
//  alert("Vous êtes sur le canvas");
//});
//Affiche les coordonnées du canvas lorsqu'on rentre dessus.
//$(canvas).mousemove(function(ev){
//	$("body").text("( ev.clientX, ev.clientY ) : ( " + ev.pageX + ", " + ev.pageY + " )");
//});

// Cliquer sur un trooper
function alertTrooper(troopers){
	//console.log("o")
	if(troopers[0]["y"] >= 5){
		//console.log("ok");
		console.log(troopers[0].y);
	};
};

//Test pour trouver où se situe la souris sur le canvas
var position = document.addEventListener('mousemove', function(event) { 
   //context2.clearRect(0,0,canvas.width,canvas.height); // efface le cadre 2
   var XYrect = canvas.getBoundingClientRect();    // action avec le canvas et pas le context
   var Xcurseur = Math.round(event.clientX - XYrect.left); 
   var Ycurseur = Math.round(event.clientY - XYrect.top);
   cv.innerHTML = 'Position X : ' + this.Xcurseur + 'px<br />Position Y : ' + this.Ycurseur + 'px';
   
   // Pour afficher le résultat sur le canvas
   //context2.fillStyle = "white";
   //context2.globalCompositeOperation = "destination-over";
   //context2.fillText("Position de la souris",10, 35);
   //context2.fillText("X="+Xcurseur, 70, 70);
   //context2.fillText("Y="+Ycurseur, 70, 105);
}); 


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//je veux récupérer les variables Xcurseur et Ycurseur mais je n'y arrive pas
//Colision entre la souris et le trooper.
document.addEventListener('mousemove', function viser(position){

	if (position.Xcurseur >= 0 && postion.Xcurseur <= 600 && postion.Ycurseur >= 0 && postion.Ycurseur <= 800){
		//for (var i = 0; i< troopList.length; i++){
		//	if( troopList[i]["x"] >= (this.Xcurseur - 22) && troopList[i]["x"] <= (this.Xcurseur + 22) && troopList[i]["y"] >= (this.Ycurseur - 11) && troopList[i]["y"] <= (this.Xcurseur + 11)){
				alert("Dans la ligne de mire");
		//	}
		//}
	}
});


//------------DEBUT DU JEU---------------------------------------
//---------------------------------------------------------------


var ice=new Image();//déclaration de l'image du sol
ice.src="ice.jpg";


//démarrage du jeu après 0,5s pour prendre le temps de charger les images
setTimeout(function(){
	startGame();
	}, 500);

//Fonction principale du jeu
function startGame(){
	drawIce();
	unitsList=[];
	unitsList=popUp(unitsList);
}