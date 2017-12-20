var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");

// Cette fonction permet d'afficher la glace qui sera le sol du jeu
var drawIce = function (imagesLoaded) {
    for(var j=0;j<16;j++)
    {
        for(var i=0;i<12;i++)
        {
            context.drawImage(ice,0,0,64,64,50*i,50*j,50,50);
        }
    }    
};

var drawTrooper = function(){
	context.drawImage(trooper,0,0,150,180,x,y,50,50);
};

var drawTieFighter = function(){
	context.drawImage(tieFighter,0,0,811,985,0,0,50,50);
};

ice=new Image();
ice.src="ice.jpg";
trooper=new Image();
trooper.src="trooper.png";
tieFighter=new Image();
tieFighter.src="TieFighter.png";
setTimeout(drawIce,100);
setTimeout(drawTieFighter,100);
setTimeout(drawTrooper,100);


var direction = {
    "ArrowRight" : 39,
    "ArrowLeft" : 37,
    "ArrowUp" : 38,
    "ArrowDown" : 40,
    "Space" : 0
};
var sy = direction["ArrowDown"];
var sx = direction["ArrowDown"];
var x = 0;
var y = 10;

document.onkeydown = function (e) {
    if (direction[e.key] === undefined)
    {
        return;
    }
    if(e.key==="Space")
    {
        console.log("press space");
    }
    if(e.key==="ArrowDown")
    {
        sy = direction[e.key];
        y=y+10
        context.clearRect(0,0,500,500);
        drawIce();
        drawTieFighter();
        drawTrooper();
    }
    if(e.key==="ArrowUp")
    {
        sy = direction[e.key];
        y=y-10
        context.clearRect(0,0,500,500);
        drawIce();
        drawTieFighter();
        drawTrooper();
    }
    if(e.key==="ArrowLeft")
    {
        sy = direction[e.key];
        x=x-10
        context.clearRect(0,0,500,500);
        drawIce();
        drawTieFighter();
        drawTrooper();
    }
    if(e.key=== "ArrowRight")
    {
        sy = direction[e.key];
        x=x+10
        context.clearRect(0,0,500,500);
        drawIce();
        drawTieFighter();
        drawTrooper();
    }
};