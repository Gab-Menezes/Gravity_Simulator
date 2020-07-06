let canvas;
let part = [];
let gravConst = 1;
let count = 0;
let oldMousePos;

let mass = 2;
let massMult = 1;

function setup()
{
    canvas = createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    frameRate(60);
    oldMousePos = createVector();

    //part[0] = new Particle(300, 300, 1000, createVector(0, 0));
    //part[1] = new Particle(400, 400, 100, createVector(0, 0));
}

function windowResized()
{
    canvas.size(windowWidth, windowHeight);
}

function draw()
{
    background(0);
    for (let i = 0; i < part.length; i++)
    {
        part[i].show();
        part[i].resetForce();
        for (let j = 1 + i; j < part.length; j++)
        {
            collision(part[i], i, part[j], j);
        }
        part[i].updatePos();        
    }

    if (mouseIsPressed)
    {       
        stroke(255);
        strokeWeight(2);
        line(oldMousePos.x, oldMousePos.y, mouseX, mouseY);
    }
}

function mousePressed()
{
    oldMousePos.x = mouseX;
    oldMousePos.y = mouseY;
}

function mouseReleased()
{
    let vel = createVector();
    vel.x = oldMousePos.x - mouseX;
    vel.y = oldMousePos.y - mouseY;
    part[part.length] = new Particle(mouseX, mouseY, mass, vel);
}

function mouseWheel(event)
{
    mass = 2;
    //UP
    if (event.delta === -100)
    {         
    		massMult++;
    }
    //DOWN
    if (event.delta === 100)
    {
        if (massMult > 1)
        {           
            massMult--;
        }
    }
    mass = pow(mass, massMult);
    document.getElementById("mass-marker").innerHTML = "Mass: " + mass;
}

function keyPressed()
{
    if (keyCode === UP_ARROW)
    {
        gravConst++;
    }
    if (keyCode === DOWN_ARROW)
    {
        if (gravConst > 1)
        {
            gravConst--;
        }
    }
    document.getElementById("gravity-const").innerHTML = "Gravity Constant: " + gravConst;
}
