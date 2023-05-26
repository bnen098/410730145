class Obj{
    constructor(args){
        //this.p = args.p || {x:random(width),y:random(height)}
        this.p = args.p || createVector(random(width),random(height))
        //this.v = {x:random(-1,1),y:random(-1,1)}
        this.v = createVector(random(-1,1),random(-1,1))
        this.size = random(5,10)
        this.color =random(fill_colors)
        this.stroke = random(stroke_colors)
    }
    draw(){
        push()
        translate(this.p.x,this.p.y)
        scale((this.v.x < 0?1:-1),-1)
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(3)
          beginShape()
            for(var i=0;i<points.length;i=i+1){
              curveVertex(points[i][0]*this.size,points[i][1]*this.size)
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
    isBallInRanger(x,y){
        let d = dist(x,y,this.p.x,this.p.y) //計算滑鼠按下的點與此物位置之間的距離
        if(d<this.size*4){  //4的由來:去看作標點最大的值，以此作為方框的高與寬
            return true   //代表有在範圍內
        }
        else{
            return false  //代表沒有
        }

    }
}
