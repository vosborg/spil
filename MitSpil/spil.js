let canvas = document.querySelector("#canvas"); 
let ctx = canvas.getContext('2d'); 

let ghost = new Image(); 
ghost.src= 'images/ghost.png'; 

let dirt = new Image(); 
dirt.src= 'images/grass.png'; 

let tree = new Image();
tree.src= 'images/tree.png'; 

let pacman = new Image();
pacman.src= 'images/pacman.png';

let finish = new Image();
finish.src= 'images/mspacman.png';


maze = 

[
    [2,0,4,1,1,1,1,1,1,1,1,1,1,1,1,3],
    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [1,0,1,0,1,1,1,1,1,0,4,0,0,0,0,4],
    [1,1,1,0,0,0,0,0,4,1,1,0,0,1,1,1],
    [0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0],
    [0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,0,0,1,1,1,1,0,1,1,1],
    [0,1,0,0,0,1,0,0,0,0,0,1,1,1,0,1],
    [0,1,0,0,0,1,0,0,1,1,1,0,0,0,0,1],
    [4,1,0,4,1,1,1,1,1,0,1,1,1,1,1,1]
]

let tileSize = 50; 

let playerPosition = {x:9, y:9};

let trees = 0; 
let dirts = 1;
let player = 2;
let finish1 = 3;
let pacmans = 4; 

function drawMaze(){

    for(let y= 0; y < maze.length; y++){

      for(let x = 0; x < maze[y].length; x++){

        if(maze[y][x] === trees){
            ctx.drawImage(tree,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === dirts){
            ctx.drawImage(dirt,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === player){
            playerPosition.x = x; 
            playerPosition.y = y; 
            ctx.drawImage(ghost,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === finish1){
            ctx.drawImage(finish,x*tileSize,y*tileSize,tileSize,tileSize);
        }else if(maze[y][x] === pacmans){
            ctx.drawImage(pacman,x*tileSize,y*tileSize,tileSize,tileSize);
        }

      }
    }
}


//Timer
let seconds = 50;
document.querySelector('#time-display').innerText = seconds;
let time;

//Spillet vises ikke
canvas.style.display = "none";

//Tid vises ikke
test.style.display = "none";

//boxscoren vises ikke
boxscore.style.display = "none";

//Henter start knappen
let btn = document.querySelector('#btn');

//Starter spillet når man trykker
btn.addEventListener('click', playgame);
function playgame(){
    //viser spillet når man klikker
    canvas.style.display = "block";

    //viser boxscore når man klikker
    boxscore.style.display = "block";
    
    //viser boxscore når man klikker
    boxscore.style.display = "block";

     //skjuler knap når man klikker
     btn.style.display = "none";

     //tid vises
     test.style.display="block";

    //Starter timeren
    time = setInterval(function () {
        seconds -= 1;
        document.querySelector('#time-display').innerText = seconds;
        
        //Time up 
        if(seconds == 0){
            gameover();
        };
    
    }, 1000);
}; 


//game over funktionen
function gameover(){
    canvas.style.display = "none";
    gametext.innerHTML="Game Over";
    test.style.display = "none";
    desc.style.display = "none";
    //gameover teksten vises ikke på forhånd
    let gameover = document.querySelector('#gameover');
    
    //injecter tekst ind i <p> tag
    if(seconds == 0 ){
        gameover.innerHTML = "<span>You ran out of time.</span>";
    };
    //reset tiden
    clearInterval(time);

    setTimeout(function(){
        location.href = "file:///C:/Users/vosbo/Desktop/Skool/3.%20semester/JS%20Spil/MitSpil/spilindex.html";
    }, 4500);
};
function tryagain(){
    canvas.style.display = "none";
    gametext.innerHTML="Try Again";
    test.style.display = "none";
    desc.style.display = "none";
    //try again teksten vises ikke på forhånd
    let tryagain = document.querySelector('#tryagain');
    
    //injecter tekst ind i <p> tag
    if(score < 6 ){
        tryagain.innerHTML = "<span>Du spiste ikke nok pacman :(</span>";
    };
    //reset tiden
    clearInterval(time);

    setTimeout(function(){
        location.href = "file:///C:/Users/vosbo/Desktop/Skool/3.%20semester/JS%20Spil/MitSpil/spilindex.html";
    }, 4500);
};

//Vinde funktionen
function sejr(){
    canvas.style.display = "none";
    wintext.innerHTML = "Tillykke";

    let sejr = document.querySelector('#wintext');

    test.style.display = "none";
    
    desc.style.display = "none";


};

function collect(){
    let gameSound = new Audio('sounds/collect.mp3');
    gameSound.play();
}

function walk(){

    let gameSound = new Audio('sounds/walk.wav');
    gameSound.play();

}

function sejrlyd(){
    let gameSound = new Audio('sounds/winsound.wav');
    gameSound.play();
}

function isWalkable(targetTile) {
    if (targetTile === pacmans || targetTile === dirts || targetTile === finish1) {
        return true;
    } else {
        return false;
    }
}

let score = 0; 


window.addEventListener('keydown', (e) => {
    let targetTile;
    switch (e.keyCode) {
        case 37: //left
            targetTile = maze[playerPosition.y][playerPosition.x - 1];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y][playerPosition.x - 1] = player; //players nye position
                maze[playerPosition.y][playerPosition.x] = dirts;
                drawMaze();
                walk();
                if (targetTile === pacmans) {
                    score++;
                    collect();
                    document.getElementById("boxscore").innerHTML = "pacman: " + score;
                }
        
            }
            break;
        case 39: //Right
            targetTile = maze[playerPosition.y][playerPosition.x + 1];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y][playerPosition.x + 1] = player; //players nye position
                maze[playerPosition.y][playerPosition.x] = dirts;
                drawMaze();

                walk();
                if (targetTile === pacmans) {
                    score++;
                    collect();
                    document.getElementById("boxscore").innerHTML = "pacman: " + score;
                }
                else if (targetTile === finish1 && score >=6){
                    sejr();
                    sejrlyd();
                }
                
                else if (targetTile === finish1 && score <6){
                    tryagain();
                } 
            }
            break;
        case 38: //Up
            targetTile = maze[playerPosition.y - 1][playerPosition.x];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y - 1][playerPosition.x] = player; //players nye position
                maze[playerPosition.y][playerPosition.x] = dirts;
                drawMaze();
                walk();
                if (targetTile === pacmans) {
                    score++;
                    collect();
                    document.getElementById("boxscore").innerHTML = "pacman:" + score;
                }
            }
            break;
        case 40: //down
            targetTile = maze[playerPosition.y + 1][playerPosition.x];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y + 1][playerPosition.x] = player; //players nye position
                maze[playerPosition.y][playerPosition.x] = dirts;
                drawMaze();
                walk();
                if (targetTile === pacmans) {
                    score++;
                    collect();
                    document.getElementById("boxscore").innerHTML = "pacman:" + score;
                }
            }
            break;
    }
    console.log(score);
})
window.addEventListener("load", drawMaze);