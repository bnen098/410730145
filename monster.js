var monster_colors ="03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04".split("-").map(a=>"#"+a)

class Monster{
    constructor(args){
        this.r = args.r || random(20,100) //怪物外圓
        this.p = args.p || createVector(random(width),random(height))
        this.v = args.p || createVector(random(-1,1),random(-1,1))
        this.color = args.color || random(monster_colors)
        this.mode  = random(["happy","bad"])
        this.IsDead = false
        this.timenum = 0
    }

    draw(){
      if(this.IsDead==false){
       push()

           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)

           if(this.mode == "happy"){
             fill(255)
             ellipse(0,0,this.r/2)
             fill(0)
             ellipse(0,0,this.r/3)
           }

           else{
             fill(255)
             arc(0,0,this.r/2,this.r/2,0,PI)
             fill(0)
             arc(0,0,this.r/3,this.r/3,0,PI)
           }
           
           stroke(this.color)
           strokeWeight(4)
           //line(this.r/2,0,this.r,0)
           noFill();
           for(var j=0;j<8;j++){
            rotate(PI/4)  //因為8腳，一腳45度，PI=180
               beginShape()
                 for(var i=0;i<(this.r/2);i++){
                   vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
                 }
               endShape()
            }
       pop()
      }

      else{  //死後爆炸的畫面圖
        this.timenum = this.timenum+1
        push()
            translate(this.p.x,this.p.y)
            fill(this.color)
            noStroke() //不要有框線
            ellipse(0,0,this.r)
            stroke(255)
            line(-this.r/3,0,this.r/3,0) //眼睛的線
            //產生腳
            stroke(this.color) 
            strokeWeight(4)
            noFill();
            for(var j=0;j<8;j++){
                rotate(PI/4)   //因為要產生八隻腳，一隻腳要旋轉45度，PI代表180，PI/4代表45度
                line(this.r/2,0,this.r,0)  //八隻腳產生一個直線
            }
        pop()
      }

    }

    update(){
        this.p.add(this.v)
        if(this.p.x <= 0 || this.p.x >= width){
            this.v.x = -this.v.x
        }

        if(this.p.y <= 0 || this.p.y >= height){
            this.v.y = -this.v.y
        }
    }

    isMonsterInRanger(x,y){
      let d = dist(x,y,this.p.x,this.p.y) //計算滑鼠按下的點與此物位置之間的距離
      if(d<this.r){ 
          return true   //代表有在範圍內
      }
      else{
          return false  //代表沒有
      }

    }
}
