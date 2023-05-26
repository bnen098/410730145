var bullet_colors ="f7b267-f79d65-f4845f-f27059-f25c54".split("-").map(a=>"#"+a)

class Bullet{
    constructor(args){
        this.r = args.r || 10
        this.p = args.p || shipP.copy()   
        this.v = args.p || createVector(mouseX-width/2,mouseY-height/2).limit(18)
        this.color = random(bullet_colors)
    }
    draw(){
       push()
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)
           fill(230)
           ellipse(4,-2.5,this.r/3)
       pop()
    }
    update(){
        this.p.add(this.v)

    }
}