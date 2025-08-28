import { Road } from "./Road.js";
import { Car } from "./car.js";
import { Visualizer } from "./visualizer.js";


const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx=carCanvas.getContext("2d");
const networkCtx=networkCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const N=50;
const cars=generateCars(N)
const traffic=[
    new Car(road.getLaneCenter(1),200,30,50,"Dummy",2)
];

animate();
function generateCars(N){
    const cars=[];
    for(let i=0;i<N;i++){
        cars.push(new Car(road.getLaneCenter(1),400,30,50,"AI"))
    }
    return cars
    
}
function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.border,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.border,traffic);
    }
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    carCtx.save();
    carCtx.translate(0, -cars.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"blue");
    }
    networkCtx.lineDashOffset=-time/50
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"red");
    }
    carCtx.restore();
    Visualizer.drawNetwork(networkCtx,cars[0].brain)
    requestAnimationFrame(animate);
}
