import { Road } from "./Road.js";
import { Car } from "./car.js";

const canvas=document.getElementById("myCanvas");
canvas.width=200;

const ctx=canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9);
const car=new Car(road.getLaneCenter(1),100,30,50,"Keys",4);
const traffic=[
    new Car(road.getLaneCenter(2),100,30,50,"Dummy",2)
];

animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.border,[]);
    }
    car.update(road.border,traffic);
    canvas.height=window.innerHeight;
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"blue");
    }

    car.draw(ctx,"red");
    ctx.restore();
    requestAnimationFrame(animate);
}
