var camX: number = 12;
var camY: number = 0;
var camZ: number = 0;

const focal: number = 10;
document.addEventListener('DOMContentLoaded', start)
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup)

var canvas: any;
var ctx: any;

var forward: boolean = false;
var backward: boolean = false;
var left: boolean = false;
var right: boolean = false;

function start() {
    const canvaslist:any = document.getElementsByClassName("canv");

    canvas = canvaslist[0];


    console.log(canvaslist);
    console.log(canvas);



    ctx = canvas.getContext("2d");

    ctx.translate(canvas.width/2,canvas.height/2); // make center of canvas 0,0


    setInterval(main, 33);
}

function main() {
    draw();
    input();
}

function draw() {
    ctx.rect(-1000,-1000,5000,5000) // not working???
    drawCube(5,5,1,5,5,0.5);
}

function input() {
    if (forward) {
        camZ += 0.1;
    }
    if (backward) {
        camZ -= 0.1;
    }
    if (left) {
        camX -= 0.2;
    }
    if (right) {
        camX += 0.2;
    }
}

function keydown(event:any) {
    var code = event.code;
    if (code == "KeyW") {
        forward = true;
    }
    if (code == "KeyS") {
        backward = true;
    }
    if (code == "KeyA") {
        left = true;
    }
    if (code == "KeyD") {
        right = true;
    }
}

function keyup(event:any) {
    var code = event.code;
    if (code == "KeyW") {
        forward = false;
    }
    if (code == "KeyS") {
        backward = false;
    }
    if (code == "KeyA") {
        left = false;
    }
    if (code == "KeyD") {
        right = false;
    }
}



function moveTo3d(x:number, y:number, z:number) {
    var cords = project(x, y, z);
    ctx?.moveTo(cords[0], cords[1]);
}

function lineTo3d(x:number, y:number, z:number) {
    if (z > camZ) {
        var cords = project(x, y, z);
        ctx?.lineTo(cords[0], cords[1]);
    } else {
        moveTo3d(x,y,z);
    }
}

function project(x:number, y:number, z:number) {
    var sx:number = 0;
    var sy:number = 0;

    if (z != 0 && z > camZ) {
        sx = focal * ((x-camX)/(z-camZ));
        sy = focal * ((y-camY)/(z-camZ));
    } else if (z == 0 && z > camZ) {
        sx = focal * ((x - camX)/(1-camZ));
        sy = focal * ((y - camY)/(1-camZ));
    }

    return [sx, sy];
}


function drawCube(x:number, y:number, z:number, width:number, height:number, depth:number) {
    // face 1
    moveTo3d(x,y,z);
    lineTo3d(x+width,y,z);
    lineTo3d(x+width,y+height,z);
    lineTo3d(x,y+height,z);
    lineTo3d(x,y,z);
    // lines
    moveTo3d(x,y,z);
    lineTo3d(x,y,z+depth);
    moveTo3d(x+width,y,z);
    lineTo3d(x+width,y,z+depth);
    moveTo3d(x+width,y+height,z);
    lineTo3d(x+width,y+height,z+depth);
    moveTo3d(x,y+height,z);
    lineTo3d(x,y+height,z+depth);
    // face 2
    moveTo3d(x,y,z+depth);
    lineTo3d(x+width,y,z+depth);
    lineTo3d(x+width,y+height,z+depth);
    lineTo3d(x,y+height,z+depth);
    lineTo3d(x,y,z+depth);
    ctx?.stroke();


}