class Particle
{
    constructor(x, y, mass, velocity)
    {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.radius = Math.cbrt(this.mass);//this.diameter/2;
        this.diameter = this.radius * 2;//pow((Math.log10(this.mass) * 10), 1.5);

        this.resultForce = createVector();
        this.acceleration = createVector();
        this.velocity = velocity;
        this.mometum = p5.Vector.mult(this.velocity, this.mass);

        this.r = floor(random(0, 256));
        this.g = floor(random(0, 256));
        this.b = floor(random(0, 256));
    }

    show()
    {
        noStroke();    
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    updatePos()
    {
        this.x += (this.velocity.x/50);
        this.y += (this.velocity.y/50) 
    }

    setForce(force)
    {
        this.resultForce.add(force);
        this.acceleration = p5.Vector.div(this.resultForce, this.mass);
        this.velocity.add(this.acceleration);
        this.mometum = p5.Vector.mult(this.velocity, this.mass);
    }

    resetForce()
    {
        this.resultForce.x = 0;
        this.resultForce.y = 0;
    }

    absorb(smaller, index)
    {
        this.mass += smaller.mass;
        this.radius = Math.cbrt(this.mass);
        this.diameter = this.radius * 2;
        background(0);
        this.show();
        this.mometum.add(smaller.mometum);
        this.velocity = this.mometum.div(this.mass);
        part.splice(index, 1);
    }
}
