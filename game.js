var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");


// affiche la glace (le sol) sur tout le canvas
var drawIce = function () {
    for(var j=0;j<16;j++)
    {
        for(var i=0;i<12;i++)
        {
            context.drawImage(ice,0,0,64,64,50*i,50*j,50,50);
        }
    }    
};

//affiche le trooper passé en paramètre aux coordonnées qui lui sont propres 
//lors de sa déclaration
var drawTrooper = function(trooper){
	context.drawImage(trooper["imTrooper"],trooper["sx"],0,156,180,trooper["x"],trooper["y"]+20,50,50);
};

//affiche le tieFighter associé au trooper passé en paramètre aux coordonnées
// qui lui sont propres lors de sa déclaration
var drawTieFighter = function(trooper){
	var tie = new Image();
	tie.src="tieFighter.png";
	context.drawImage(tie,0,0,810,984,trooper["x"],trooper["y"],50,50);
};

//fait appraître les tieFighters (immobiles). Au bout de deux 
//secondes les tieFighters disparaissent et les troopers 
//apparaissent et avancent.
var popUpTroopers = function(troopers){

	for(var i=0;i<troopers.length;i++){
		drawTieFighter(troopers[i]);
		drawTrooper(troopers[i]);
	}
	setTimeout(function(){
		for (var j=0;j<troopers.length;j++){
			refreshTroopers(troopers);
			trooperMovement(troopers);	
		}
	},2000);
}

//actualise l'affichage des troopers (efface donc les tieFighters)
var refreshTroopers = function(troopers){
	drawIce();
	for (var i=0;i<troopers.length;i++){
		drawTrooper(troopers[i]);
	}

}

//gère l'affichage des troopers en cours de mouvement
var trooperMovement= function(troopers){
	for (var i=0;i<troopers.length;i++){
		littleMoveDown(troopers);
		refreshTroopers(troopers);
	}
}

//fonction pour changer la coordonnée y des troopers
function littleMoveDown(troopers){
	var i =0;
	var fonc = setInterval(function(){
		console.log(troopers);
		animationTrooper(troopers[i]);
		refreshTroopers(troopers);
		
		troopers[i]["y"]=troopers[i]["y"]+2/16;
		//je ne sais pas pourquoi mais l'opération ci dessus 
		// est répétée 16 fois par Interval, d'où "/16"
		//"2" correspond donc au nb de pixel de descente
		i++;	
		if (i==troopers.length){
			i=0;
		}

		
	},60); 
}

//fonction stop pour arrêter le setInterval et regarder
//ce qu'il s'y passe dans al console
//écrire dans le setInterval dans le cas au dessus: stop(fonc);
function stop (fonc){
	clearInterval(fonc);
}

//gère le choix de l'image du trooper pour faire l'animation
function animationTrooper(trooper){
	if (trooper["sx"]==624){
		trooper["sx"]=-156;
	}
	trooper["sx"]+=156;
}




//Constructeur de l'objet trooper. Ses paramètres (x,y) sont les 
//coordonnées de son coin supérieur gauche. sx permet de gérer l'animation
function Trooper (x, y){
	this.imTrooper=new Image();
	this["imTrooper"].src="trooper.png";
	this.x=x;
	this.y=y;
	this.sx=0;
}


// Gestion du curseur et du click
// Evenement à supprimer quand le jeu fonctionnera
//$(canvas).click(function() {
//    alert("Vous m'avez cliqué !");
//});

// Test pour trouver où se situe la souris
document.addEventListener('mousemove', function(e) {
    cv.innerHTML = 'Position X : ' + e.clientX + 'px<br />Position Y : ' + e.clientY + 'px';
});

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
	if(troopers[0]["y"] >= 49){
		alert(troopers[0].y);
	};
};







//Colision entre la souris et le trooper.

//------------DEBUT DU JEU---------------------------------------
//---------------------------------------------------------------

//déclaration de l'image du sol
var ice=new Image();
ice.src="ice.jpg";

//déclaration du sprite du trooper
var trooper=new Image();
trooper.src="trooper.png";

//déclaration de l'image du tieFighter
var tie = new Image();
tie.src="tieFighter.png";

//démarrage du jeu après 0,1s pour prendre le temps de charger les images
setTimeout(function(){
	startGame();
	}, 100);

//Fonction principale du jeu
function startGame(){
	drawIce();
	//déclaration d'une array qui va contenir tous les troopers avec
	//leur tieFighter
	//TO DO : gérer un popUp avec des coordonnees random x,y
	//et à intervalle de temps régulier (cf consignes)
	var troopers = [new Trooper(0,0), new Trooper(50,50), new Trooper(340,20), new Trooper(160,0)];
	
	//popUp de la liste des troopers ci dessus.
	
	popUpTroopers(troopers);
	alertTrooper(troopers);

}