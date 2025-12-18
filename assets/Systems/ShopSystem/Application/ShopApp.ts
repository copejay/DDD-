




export class ShopApp{

    static _instance:ShopApp;

    static get instance(){
        if(!this._instance){
            this._instance=new ShopApp();
            return this._instance;
        }else{
            return this._instance;
        }
    }

    private ShopEntryUI;

    //接收外部注入
    initEntryUI(ShopEntryUI){
        this.ShopEntryUI=ShopEntryUI;
    }


    //对外方法
    ShopMerchantClick(){
        let ShopItemInfoList=[{id:"MJ",price:999},{id:"Hello",price:6}]
        this.ShopEntryUI.openShopBoard(ShopItemInfoList);
    }

    createShopBoard(){
        let ShopItemInfoList=[{id:"MJ",price:999},{id:"Hello",price:6}]
        this.ShopEntryUI.CreateShopBoard(ShopItemInfoList);

    }


}