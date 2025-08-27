class Level1{
    constructor(inputCount,outputCount){
        this.inputs=new Array[inputCount]
        this.outputs=new Array[outputCount]
        this.biases=new Array[outputCount]


        this.weight=[];

        for(i=0;i<inputCount;i++){
            this.weight[i]=new Array[outputCount]
        }

        
    }
}