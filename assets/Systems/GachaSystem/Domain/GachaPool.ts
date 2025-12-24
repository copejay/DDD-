
let GiftIDPool=["jiuzhuanjindan","dahuandan","lingshi","bainianlingru","01","02","03","04","05","06","07","08","09","10"];

export class GachaPool{

    private GiftIDPool=GiftIDPool;


    public Gacha(){
        const index=Math.floor(Math.random()*this.GiftIDPool.length);
        return {id:this.GiftIDPool[index],count:5};
    }

    public Gacha_Ten(){
        const result:Array<{id:string,count:number}>=[];
        for(let i=0;i<10;i++){
            result.push(this.Gacha());
        }
        return result;
    }

}