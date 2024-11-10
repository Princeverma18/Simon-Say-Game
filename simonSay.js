let gameSeq = [];
let userSeq = [];

let btns = [ "red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

let h3 = document.querySelector("h3");
h3.innerHTML = `Highest Score : <b>${highestScore}</b>`;

// Game ko start krne k liye //
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

// Button ko game k help se Flash krne k liye
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    }, 250);
}



// Button ko Flash krne k liye
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    }, 250);
}

// Level ko aage krne k liye
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`; 

    let ranIdx = Math.floor(Math.random()*3); //Random button choose krne k liye
    let ranColor = btns[ranIdx]; // Uska index pta krne k liye
    let ranBtn = document.querySelector(`.${ranColor}`); // uska color pta krne k liye
    // console.log(ranBtn);
    // console.log(ranIdx);
    // console.log(ranColor);
    gameSeq.push(ranColor); // Game sequence me add krne k liye
    console.log(gameSeq);
    gameFlash(ranBtn);

}

// User ki or Game ki sequence check krne k liye 
function checkAns(idx){
    console.log("curr level", level);
    // let idx = level - 1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 500);
        }
    }
    else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";

        },150);

        updateHighestScore();
        reset();
    }
}

// Update the highest score if current level is greater
function updateHighestScore(){
    if(level>highestScore){
        highestScore = level-1; // As level increment after a win
        h3.innerHTML = `Highest Score : <b>${highestScore}</b>`;
    }
}


// User ne jo button press kiya h usko dikhane k liye
function btnPress(){
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);  // user ne jo button press kra h usko color add krne k liye k liye

    checkAns(userSeq.length-1); // Jo user ki length h usi k barabar length rkhi h 
}



// Sabhi button ko press krne ka access dene k liye
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}


// Jb Game complete ho jaye ya game over likha hua aaye to usko reset krne k liye
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;    

}