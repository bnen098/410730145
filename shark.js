class Shark{
    constructor(args){
        this.p = args.p || createVector(random(width),random(height))
        this.v = createVector(4,4)
        this.size = 10
        this.color =random(fill_colors)
        this.stroke = random(stroke_colors)
    }
    draw(){
        push()
        translate(this.p.x,this.p.y)
        scale((this.v.x < 0?1:-1),-1)
        fill(255,100,100)
        stroke(this.stroke)
        strokeWeight(3)
          beginShape()
            for(var i=0;i<fishpoints.length;i=i+1){
              curveVertex(fishpoints[i][0]*this.size,fishpoints[i][1]*this.size)
            }
          endShape()
        pop()
    }
    update(){
        this.p.add(this.v)
        //++++碰壁的程式碼
        if(this.p.x <= 0 || this.p.x >= width){
            this.v.x = -this.v.x
        }

        if(this.p.y <= 0 || this.p.y >= height){
            this.v.y = -this.v.y
        }
    }
    isFishInRanger(x,y){
        let d = dist(x,y,this.p.x,this.p.y) //計算滑鼠按下的點與此物位置之間的距離

        if(d<this.size*14){  //4的由來:去看作標點最大的值，以此作為方框的高與寬
            return true   //代表有在範圍內
        }
        
        else{
            return false  //代表沒有
        }

    }
}
