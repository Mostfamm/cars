import React from "react";
import './App.css';
import { useHistory } from "react-router-dom";
//const axios = require('axios');
 import axios from "axios";
// import Sound from "react-sound";
// import PlaySound from "../components/Sound/mp3"

const Cars = () => {

    //npm i kaboom
    var GameStart = true;
    var movingLeft = false;
    var movingRight = false;
    var movingUp = false;
    var movingDown = false;
    var speedCar = 8;
    var scoreGame=0;
    var points=1;
    var coins=0;
    var MyCar = document.getElementById("TheCar");
    var AppGame = document.getElementById("gameApp");
    var playAgain = document.querySelector(".playAgain");
    var lines = null;
    var newCar = null;
    var score=document.querySelector(".score");
   // var z=document.getElementById("a");
   const history = useHistory();

    const Start = () => {
        console.log(localStorage.getItem('coins'));
        console.log('start new game');
        playAgain = document.querySelector(".playAgain")
        playAgain.classList.add('hide');
        scoreGame=1;
        points=1;
        coins=0;
        speedCar = 8;
        GameStart = true;
        AppGame = document.getElementById("gameApp");
        score=document.getElementById("score")

        for (let i = 0; i <9; i++) {
            let roadLine = document.createElement("div");
            roadLine.setAttribute("class", "lines");
            roadLine.style.top = (i * 120) + "px";
            AppGame.appendChild(roadLine);
        }

        for (let i=0;i<4;i++){
            newCar=document.createElement("div");
            newCar.setAttribute("class", "enemy");
            let randomImg=Math.floor(Math.random()*3);
            if(randomImg===0){newCar.classList.add("img1")}
            if(randomImg===1){newCar.classList.add("img2")}
            if(randomImg===2){newCar.classList.add("img3")}
            newCar.style.top= ((i+1)*295)*-1 +"px";
            let x= Math.floor(Math.random()*475);
            newCar.style.left= x + "px";
            AppGame.appendChild(newCar);
        }
        MyCar = document.createElement("div");
        MyCar.setAttribute("class", "square");
        MyCar.style.left = "210px";
        MyCar.style.top = "608px";
        AppGame.appendChild(MyCar);
        eventhandler()
        PlayGame()
    }
        const MoveEnemyCar=()=>{
         let allEnemyCars=document.querySelectorAll(".enemy");
         allEnemyCars.forEach(function(ele){
            if (parseInt(ele.style.top)>610) 
            {
            ele.style.top = -608+"px"
            let enemyx= Math.floor(Math.random()*475)
            ele.style.left = enemyx +"px"
            ele.classList.remove("img1")
            ele.classList.remove("img2")
            ele.classList.remove("img3")
            let randomImg=Math.floor(Math.random()*3);
            
            if(randomImg===0){ele.classList.add("img1")}
            if(randomImg===1){ele.classList.add("img2")}
            if(randomImg===2){ele.classList.add("img3")}
            }
            else
            ele.style.top = parseInt(ele.style.top) + speedCar + "px";
      })       
    }
        const  eventhandler = () =>{
            window.addEventListener('keydown', event =>{
            if(event.which === 37)
            { movingLeft = true;}
            if(event.which === 38)
            {movingUp = true;}           
            if(event.which === 39)
            {movingRight = true;}
            if(event.which === 40)
            {movingDown = true;}
            }) 

            window.addEventListener('keyup', event =>{
            movingDown = false;
            movingUp= false;
            movingRight = false;
            movingLeft = false;
            })  
        }
    const handleMoving=()=>{
        if (movingLeft)
          window.requestAnimationFrame(moveLeft);
        if (movingUp)
          window.requestAnimationFrame(moveUp);
          if (movingDown)
          window.requestAnimationFrame(moveDown);
        if (movingRight)
          window.requestAnimationFrame(moveRight);
    }

    const handelRect=()=>{
      let  enemies = document.querySelectorAll('.enemy');
      let MyCarRect=MyCar.getBoundingClientRect();
      enemies.forEach(ele =>{
          let enemyCarRect = ele.getBoundingClientRect();
          if(!((MyCarRect.bottom < enemyCarRect.top) || (MyCarRect.top > enemyCarRect.bottom ) || (MyCarRect.right < enemyCarRect.left) || (MyCarRect.left > enemyCarRect.right)))
            {
                // dbcoin=dbcoin+coin
            AppGame.innerHTML="Game over Your score is :-" + MyCar.scoreGame;
            GameStart=false;
            }      
        })
    }

    const handdelScoreGame=()=>{
        var score=document.querySelector(".score");  
        scoreGame+=points;
        if(scoreGame%500 === 0)
        {
            console.log("we are increasing the speed")
            points++;
            speedCar+=2;
        }
        coins=Math.round(scoreGame/10);
        score.innerHTML = "<br>Score :" + scoreGame +"<br>"+"Coins :"+coins+"<br>"+"Speed :"+speedCar;
        
    }

    const PlayGame=()=>{
        moveLines(); 
        MoveEnemyCar(); 
        handleMoving();
        handdelScoreGame(); 
        handelRect();
        if(GameStart)
          window.setTimeout(window.requestAnimationFrame(PlayGame),3000);
        else
        {
          playAgain.classList.remove('hide');
        }    
    }

    const moveLeft = () => {
        
        if (parseInt(MyCar.style.left) > 0) {
            MyCar.style.left = parseInt(MyCar.style.left) - speedCar + "px";
        }
    }
    const moveUp = () => {
        if (!(parseInt(MyCar.style.top) < 35))
            MyCar.style.top = parseInt(MyCar.style.top) - speedCar + "px";
    }
    const moveRight = () => {
        if (parseInt(MyCar.style.left) < 421)
            MyCar.style.left = parseInt(MyCar.style.left) + speedCar + "px";
    }
    const moveDown = () => {
        if (parseInt(MyCar.style.top) < (608-speedCar))
            MyCar.style.top = parseInt(MyCar.style.top) + speedCar + "px";
    }
    window.onload = Start

    const moveLines = () => {
         lines = document.querySelectorAll(".lines");
        lines.forEach(function (item) {
            if (parseInt(item.style.top)>608) 
              item.style.top = "-35px"
              else
            item.style.top = parseInt(item.style.top) + speedCar + "px";
        })
    }
    const handlePlayAgain = () =>{
        Start();
    }
   
    const logOut=()=>{
        let path = `/`; 
        history.push(path);
    }
    /* import { useHistory } from "react-router-dom";*/


  


    
    
    return (
        <div className="Container">
       
        <div className="score">score</div>
        <button onClick={logOut}> logOut </button>
            <button className="playAgain" id="playAgain" onClick={handlePlayAgain}>Play Again</button>
        <div className="App" id="gameApp" >
        <div id="enemy"></div>
        
        </div>
        {/* <PlaySound/> */}
        </div>
        
    )
}

export default Cars;