let gameseq = [];
let userseq = [];

let btns = ["yellow","red","blue","green"];
let started = false;
let level = 0;
let highscore = 1;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
document.addEventListener("keypress",function(){ 
    if(started == false)
    {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function flash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500);
}

function levelUp()
{
    userseq = [];
    level++;
    if(level >= highscore)
    {
        highscore = level;
    }
    h2.innerText = `Level ${level}`;
    
    let randomidx = Math.floor(Math.random()*3);
    let randomColor = btns[randomidx];
    let randomBtn = document.querySelector(`.${randomColor}`);
   
    gameseq.push(randomColor);
    console.log(gameseq);
    flash(randomBtn);
}


function checkAns(idx) {
    if(userseq[idx] === gameseq[idx])
    {
        if(userseq.length == gameseq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
    else
    {
        h2.innerHTML = `Game Over! Your Score was <b>${level} </b> Press any key to Start.`
        h3.innerHTML = `Highest Score = ${highscore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },1000);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click",btnpress);
}

function reset(){
    started = false;
    userseq = [];
    gameseq = [];
    level = 0;
}