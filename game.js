var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");
var context2 = canvas.getContext("2d");


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
			troopers=trooperMovement(troopers);	
		}
	},2000);
	return troopers;
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
		troopers=littleMoveDown(troopers);
		refreshTroopers(troopers);
		console.log("troop"+ troopers[1]["y"]);
	}
	return troopers;

}

//fonction pour changer la coordonnée y des troopers
function littleMoveDown(troopers){
	var i =0;
	var fonc = setInterval(function(){
		//console.log(troopers);
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

		
	},40);
	return troopers; 
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
	var trooper1=new Trooper(0,0);
	var trooper2=new Trooper(50,50);
	var trooper3=new Trooper(160,0);
	var trooper4=new Trooper(340,20);
	var troopList = [trooper1, trooper2, trooper3 ,trooper4];
	
	//popUp de la liste des troopers ci dessus.
	
	troopList=popUpTroopers(troopList);
	setInterval(function(){
		alertTrooper(troopList);
	},1000);


}