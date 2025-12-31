



type Dir= "right" | "left" | "up" | "down";



export class worldMessage{

    message:string="";

    target:string="";

    move(moveTo:Dir){
        if(moveTo=="right"){
            this.message="你向东走";
        }else if(moveTo=="left"){
            this.message="你向西走";
        }else if(moveTo=="up"){
            this.message="你向北走";
        }else if(moveTo=="down"){
            this.message="你向南走";
        }
    }

    targetTo(target){
        if(target){
            this.target=`${target.name}`;
        }else{
            this.target="";
        }
    }

    moved(moved){
        let newMessage;
        if(moved==true){
            newMessage=`你到了${this.target}`;
        }else{
            newMessage=`此路不通！`;
        }
        this.message=`${this.message},${newMessage}`;
    }
}