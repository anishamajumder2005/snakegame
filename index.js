let inputdir={x:0,y:0};
const foodsound=new Audio('food.mp3');
const movesound=new  Audio('move.mp3');
const bcgmusic=new Audio('music.mp3');
const endgame=new Audio('gameover.mp3');
//Game Fucntions
let speed=6;
let lastPaintTime=0;
let snakearr=[
    {x:13,y:15}
]
let score=0;
const main=(ctime)=>{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 <(1/speed)){
        return;
    }
    lastPaintTime=ctime;
    //console.log(ctime);
    gameEngine();
};
let foodarr={x:6,y:7};
const isCollapse=(sarr)=>{
    //if snake gous into itself
    for(let i=1;i<snakearr.length;i++){
        if(sarr[i].x===sarr[0].x&&sarr[i].y===sarr[0].y){
            return true;
        }
    }
    if(sarr[0].x>=18||sarr[0].x<=0 || sarr[0].y>=18||sarr[0].y<=0){
            return true;
    }
    return false;
}
const gameEngine=()=>{
    //uPDATE snake array ->diff bodt parts and food
    if(isCollapse(snakearr)){
        endgame.play();
        bcgmusic.play();
        inputdir={x:0,y:0};
        alert("GameOver . Press any key to play again !!");
        snakearr=[{x:13,y:15}];
        bcgmusic.play();
        score=0;
    }
    //updating score
    let board=document.getElementById("board")
    if(snakearr[0].y===foodarr.y&&snakearr[0].x===foodarr.x){
        foodsound.play();
        score+=1;
        scoreBox.innerHTML="Score :"+score
        snakearr.unshift({x:snakearr[0].x+inputdir.x,y:snakearr[0].y+inputdir.y});
        let a=2;
        let b=16;
        foodarr={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    //move the snake
    for(let i=snakearr.length-2;i>=0;i--){
        
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x +=inputdir.x;
    snakearr[0].y +=inputdir.y;
    //Render the snake-->display
    board.innerHTML="";
    snakearr.forEach((e,idx)=>{
        snakeele=document.createElement('div');
        snakeele.style.gridRowStart=e.y;
        snakeele.style.gridColumnStart=e.x;
        
        if(idx===0){
            snakeele.classList.add('head');
        }
        
        else {
            snakeele.classList.add('snake');
        }
        board.appendChild(snakeele);
    });
    //display the food
    foodele=document.createElement('div');
    foodele.style.gridRowStart=foodarr.y;
    foodele.style.gridColumnStart=foodarr.x;        
    foodele.classList.add('food')
    board.appendChild(foodele);

}


//main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir={x:0,y:1};
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x=1;
            inputdir.y=0;
            break;
        
        default:
            break;
    }

})