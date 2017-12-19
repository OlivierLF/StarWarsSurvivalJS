var canvas = document.getElementById("cv");
var context = canvas.getContext("2d");

// Cette fonction permet d'afficher la glace qui sera le sol du jeu
var drawIce = function () {
    for(var j=0;j<16;j++)
    {
        for(var i=0;i<12;i++)
        {
            context.drawImage(ice,0,0,64,64,50*i,50*j,50,50);
        }
    }    
};


var ice = new Image();
ice.src="ice.jpg";
ice.onload = drawIce;

