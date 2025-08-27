export class Controls{
    constructor(type){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch(type){
            case "Keys":
                this.#addKeyboardListeners();
                break;
            case "Dummy":
                this.forward=true
                break;
        }
    }

    #addKeyboardListeners(){
        document.addEventListener("keydown", (event) => {
            switch(event.key){
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        });

        document.addEventListener("keyup", (event) => {
            switch(event.key){
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        });
    }
}