function collision(part1, index1, part2, index2)
{
    stroke(255);;
    strokeWeight(2);
    let index;

    let bigger = (part1.radius >= part2.radius) ? part1 : part2;
    if (bigger == part1) 
    {
        smaller = part2;
        index = index2;
    }
    else
    {
        smaller = part1;
        index = index1;
    }
    //let smaller = (bigger == part1) ? part2 : part1;

    let hip = dist(bigger.x, bigger.y, smaller.x, smaller.y);
    //line(bigger.x, bigger.y, smaller.x, smaller.y);

    let opoSide;
    let angleSin;
    let angle;
    let colliX;
    let colliY;

    if (smaller.x >= bigger.x && smaller.y <= bigger.y)
    {
        opoSide = dist(smaller.x, bigger.y, smaller.x, smaller.y);
        angleSin = opoSide/hip;
        angle = asin(angleSin);
        //line(smaller.x, bigger.y, smaller.x, smaller.y);

        colliX = (cos(angle) * bigger.radius);
        colliY = -(sin(angle) * bigger.radius);
        
        colliX += bigger.x;
        colliY += bigger.y;

        calcForces(bigger, smaller, angle, hip);
        if (smaller.x == bigger.x && smaller.y == bigger.y)
        {
            bigger.absorb(smaller, index);
        }
        else
        {
            let difX = smaller.x - colliX;
            let difY = smaller.y - colliY;
            if (difX <= 0 && difY >= 0)
            {
                bigger.absorb(smaller, index);
            }
        }
        //console.log("1", angle);
    }
    else if (smaller.x <= bigger.x && smaller.y <= bigger.y)
    {
        opoSide = dist(smaller.x, bigger.y, smaller.x, smaller.y);
        angleSin = opoSide/hip;
        angle = asin(angleSin);
        //line(smaller.x, bigger.y, smaller.x, smaller.y);
        
        angle = 180 - angle;
        colliX = (cos(angle) * bigger.radius);
        colliY = -(sin(angle) * bigger.radius);

        colliX += bigger.x;
        colliY += bigger.y;

        calcForces(bigger, smaller, angle, hip);
        let difX = smaller.x - colliX;
        let difY = smaller.y - colliY;
        if (difX >= 0 && difY >= 0)
        {
            bigger.absorb(smaller, index);
        }
        
        //console.log("2", angle);
    }
    else if (smaller.x <= bigger.x && smaller.y >= bigger.y)
    {
        opoSide = dist(bigger.x, smaller.y, smaller.x, smaller.y);
        angleSin = opoSide/hip;
        angle = asin(angleSin);
        //line(bigger.x, smaller.y, smaller.x, smaller.y);
        
        angle = (angle == 90) ? 270 : (270 - angle);
        colliX = (cos(angle) * bigger.radius);
        colliY = -(sin(angle) * bigger.radius);

        colliX += bigger.x;
        colliY += bigger.y;

        calcForces(bigger, smaller, angle, hip);
        let difX = smaller.x - colliX;
        let difY = smaller.y - colliY;
        if (difX >= 0 && difY <= 0)
        {
            bigger.absorb(smaller, index);
        }
        //console.log("3", angle);
    }
    else if (smaller.x >= bigger.x && smaller.y >= bigger.y)
    {
        opoSide = dist(bigger.x, smaller.y, smaller.x, smaller.y);
        angleSin = opoSide/hip;
        angle = asin(angleSin);
        //line(bigger.x, smaller.y, smaller.x, smaller.y);
        
        angle = 270 + angle;
        colliX = (cos(angle) * bigger.radius);
        colliY = -(sin(angle) * bigger.radius);

        colliX += bigger.x;
        colliY += bigger.y;
        
        calcForces(bigger, smaller, angle, hip);
        let difX = smaller.x - colliX;
        let difY = smaller.y - colliY;
        if (difX <= 0 && difY <= 0)
        {
            bigger.absorb(smaller, index);
        }
        //console.log("4", angle);
    }

    // stroke(255);;
    // strokeWeight(10);
    // point(colliX, colliY);

}

function calcForces(bigger, smaller, angle, dist)
{
    let attrac = (gravConst * bigger.mass * smaller.mass)/pow(dist, 2);
    let force = createVector();

    force.x = -cos(angle) * attrac;
    force.y = sin(angle) * attrac;
    smaller.setForce(force);

    force.x = cos(angle) * attrac;
    force.y = -sin(angle) * attrac;
    bigger.setForce(force);
}
