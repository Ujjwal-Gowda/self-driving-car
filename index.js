import { Road } from "./Road.js";
import { Car } from "./car.js";
import { Visualizer } from "./visualizer.js";
import { NeuralNetwork } from "./network.js";


const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;
let placement = -400; 

const carCtx=carCanvas.getContext("2d");
const networkCtx=networkCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const N=50;
const cars=generateCars(N)

let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
            cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain")
        )
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.3);
        }
    }
}
setInterval(() => {
  console.log("Runs every 2 seconds");
  let lane=Math.floor(Math.random()*3);
  placement -= 400;
  console.log("New lane:", lane);
  traffic.push(new Car(road.getLaneCenter(lane),placement,30,50,"Dummy",2));
  if (traffic.length > 50) {
    traffic.splice(0, 1); 
  }
}, 1000);


const traffic=[
    // new Car(road.getLaneCenter(1),200,30,50,"Dummy",2),
    // new Car(road.getLaneCenter(0),-300,30,50,"Dummy",2),
    // new Car(road.getLaneCenter(2),-400,30,50,"Dummy",2)
];

animate();
window.save=function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
    
}
window.discard=function discard(){
    localStorage.removeItem("bestBrain");
}
function generateCars(N){
    const cars=[];
    for(let i=0;i<N;i++){
        cars.push(new Car(road.getLaneCenter(1),400,30,50,"AI",5))
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

    bestCar=cars.find(
        c=>c.y==Math.min(...cars.map(c=>c.y))
    );
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;
    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=0.2;
    networkCtx.lineDashOffset=-time/50
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"red",true);
    carCtx.restore();

    Visualizer.drawNetwork(networkCtx,bestCar.brain)
    requestAnimationFrame(animate);
}
