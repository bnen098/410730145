let points     = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2],[-3, 5], [3, 7], [1, 5]];
let fishpoints = [[14,5],[13,2],[12,0],[13,-3],[10,-1],[4,-2],[3,-4],[1,-3],[-4,-3],[-6,-2],[-6,-7],[-8,-5],[-9,-2],[-13,-1],[-11,0],[-14,1],[-12,2],[-9,3],[-4,3],[-2,7],[0,3],[3,2],[9,1],[14,5],[13,2],[12,0]];
var stroke_colors =  "90e0ef-ade8f4-caf0f8".split("-").map(a=>"#"+a)
var fill_colors ="03045e-023e8a-0077b6-0096c7".split("-").map(a=>"#"+a)
var seagrass_colors = "22577a-38a3a5-57cc99-80ed99-c7f9cc".split("-").map(a=>"#"+a)


function preload(){
  fish_sound      = loadSound("sound/wrong.mp3")
  bullet_sound    = loadSound("sound/shoot1.mp3")
  monster_sound   = loadSound("sound/right.mp3")
  ocean_sound     = loadSound("sound/ocean1.mp3")
  eat_fish_sound  = loadSound("sound/eat_fish.mp3")
  sharkdead_sound = loadSound("sound/sharkdead.mp3")
  lose_sound      = loadSound("sound/lose.mp3")
}

var ball
var balls = []
var bullet
var bullets = []
var monster
var monsters = []
var shark
var sharks =[]
var score = 0
var shipP         //設定砲台的位置

function setup() {
    createCanvas(windowWidth,windowHeight)
    shipP = createVector(width/2,height/2)  //預設砲台的位置為視窗的中間(使用向量座標)
    ocean_sound.loop()

    for(var j=0;j<10;j=j+1){
       ball = new Obj({})
       balls.push(ball)
    }

    for(var j=0;j<40;j=j+1){
      monster = new Monster({})
      monsters.push(monster)
    }

    for(var j=0;j<1;j=j+1){
      shark = new Shark({})
      sharks.push(shark)
    }

}



function draw(){

  if (balls.length === 0 ) {
    background(0); 
    ocean_sound.stop()
    push()
      fill(255,0,0); 
      textAlign(CENTER, CENTER); 
      textSize(100); 
      text("Game Over", width/2, height/2);
    pop()
    return; 
  }

    push()
      let g = drawingContext.createLinearGradient(0 , width/2, 0 , height/4); //設定漸層位置
	    g.addColorStop(0, color(0, 60, 100));   //設定漸層顏色
	    g.addColorStop(1,"#48cae4" );  ////設定漸層顏色
	    drawingContext.fillStyle = g;    //把完成好的漸層指定回畫面上
	    drawingContext.strokeStyle = g;	  //把完成好的漸層指定回畫面上
	    rect(0, 0, width, height);   //畫圖案
    pop()
    //background("#48cae4")

    push()
      strokeWeight(50)
      stroke(255)
      strokeWeight(50)
      for(j=0;j<90;j++){
         anemone(j*20,seagrass_colors[j%seagrass_colors.length],j+mouseX/5000)
      }
    pop()

    if(keyIsPressed){  //鍵盤是否被按下，如果有鍵盤被按下，keyPressed的值為true
      if(key=="ArrowLeft" || key=="a"){  //按下鍵盤的往左鍵
        shipP.x = shipP.x-20
      }
      if(key=="ArrowRight" || key=="d"){  //按下鍵盤的往右鍵
        shipP.x = shipP.x+20
      }
      if(key=="ArrowUp" || key=="w"){  //按下鍵盤的往上鍵
        shipP.y = shipP.y-20
      }
      if(key=="ArrowDown" || key=="s"){  //按下鍵盤的往下鍵
        shipP.y = shipP.y+20
      }    
    }
  

    for(let ball of balls){
      ball.draw()
      ball.update()
      for(let bullet of bullets){
        if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
            score = score-4
            fish_sound.play()
            balls.splice(balls.indexOf(ball),1)
            bullets.splice(bullets.indexOf(bullet),1)
        }
      }
    }

    for(let monster of monsters){

      if(monster.IsDead && monster.timenum>=6){
        monsters.splice(monsters.indexOf(monster),1) //讓怪物從怪物資料倉庫內移除
        score = score+1.5
      }
  
      monster.draw()
      monster.update()
      for(let bullet of bullets){
        if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){
            // score = score+1.5
            monster_sound.play()
            monster.IsDead = true //已經被打到了，準備執行爆炸後的畫面
            bullets.splice(bullets.indexOf(bullet),1)
        }
      }
    }

    for(let shark of sharks){
      shark.draw()
      shark.update()
      for(let ball of balls){
        if(shark.isFishInRanger(ball.p.x,ball.p.y)){
            score = score-4
            eat_fish_sound.play()
            // sharks.splice(sharks.indexOf(shark),10)
            balls.splice(balls.indexOf(ball),1)
        }
      }
    }

    for(let shark of sharks){
      shark.draw()
      shark.update()
      for(let bullet of bullets){
        if(shark.isFishInRanger(bullet.p.x,bullet.p.y)){
            score = score+40
            sharkdead_sound.play()
            sharks.splice(sharks.indexOf(shark),1)
            bullets.splice(bullets.indexOf(bullet),1)
        }
      }
    }

    for (let monster of monsters) {
      monster.draw();
      monster.update();
      if (dist(monster.p.x, monster.p.y, shipP.x, shipP.y) < 50) {
        score = score+1.5
        monster_sound.play()
        monsters.splice(monsters.indexOf(monster), 1);
      }
    }

    for (let shark of sharks) {
      shark.draw();
      shark.update();
    
      // 碰撞检测
      if (dist(shark.p.x, shark.p.y, shipP.x, shipP.y) < 50) {
        // 鲨鱼与砲台发生碰撞，触发游戏结束逻辑
        gameover();
        return; // 提前结束绘制循环
      }
    }

    for(let bullet of bullets){
      bullet.draw()
      bullet.update()
    }

    textSize(50)
    text(score,50,50)
    //畫砲台
    push()
      let dx = mouseX-width/2   //滑座至中心x軸距
      let dy = mouseY-height/2
      let angle = atan2(dy,dx)  //反tan算角度

      translate(shipP.x,shipP.y) //砲台的位置 ，使用shipP的向量值

      rotate(angle)  //翻轉angle

      fill("#007f5f")
      push()
        rotate(PI / 4)
      pop()
      beginShape();
       vertex(55, -30); // 顶部点
       vertex(85, 0); // 右侧点
       vertex(55, 30); // 底部点
       vertex(10, 0); // 左侧点
      endShape(CLOSE)

      fill(255)
      ellipse(60,10,15)
      fill(0)
      ellipse(60,10,10)

      fill("#aacc00")
      triangle(10,0,-25,-25,-25,25)
    pop()

    if (monsters.length === 0 && sharks.length === 0) {
      push()
        let g = drawingContext.createLinearGradient(0 , width/2, 0 , height/4); //設定漸層位置
        g.addColorStop(0, color(0, 60, 100));   //設定漸層顏色
        g.addColorStop(1,"#48cae4" );  ////設定漸層顏色
        drawingContext.fillStyle = g;    //把完成好的漸層指定回畫面上
        drawingContext.strokeStyle = g;	  //把完成好的漸層指定回畫面上
        rect(0, 0, width, height);   //畫圖案
      pop()
      ocean_sound.stop()
      push()
        fill(255); 
        textAlign(CENTER, CENTER); 
        textSize(100); 
        text("Congratulations", width/2, height/3);
        text(score, width/2, height/2); 
      pop()
      return; 
    }

}


function anemone(xx,clr,rid){   //海葵的函數，xx代表顯示x軸位置，clr為顏色
  stroke(clr)
  fill(clr)
  beginShape()
   strokeWeight(noise(rid,50)*100)
   leng = noise(rid,50)*800
   for(i=0;i<leng;i=i+2){

    deltaX = noise(i/500+frameCount/500,rid)*200
    curveVertex(xx+deltaX,height-i)

   }
  endShape()

}

function mousePressed(){

  for(let ball of balls){
    if(ball.isBallInRanger(mouseX,mouseY)){
        //把倉庫的這個物件刪除
        score = score-4
        fish_sound.play()
        balls.splice(balls.indexOf(ball),1)
      }
    }

    bullet = new Bullet({
      r:random(10,30),
      color:random(stroke_colors)
    })
    bullets.push(bullet)
    bullet_sound.play()
}

function keyPressed(){
  if(key==" "){

    bullet  = new Bullet({
      r:random(10,30),
      color:random(stroke_colors)
    })
    bullets.push(bullet) 
    bullet_sound.play()
  }  

}

function gameover() {
  ocean_sound.stop(); // 停止背景音乐
  balls = []; // 清空小球数组，让游戏结束
  lose_sound.play(); // 播放失败音效
  push();
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("Game Over", width / 2, height / 2);
  pop();
}
