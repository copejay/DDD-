
import { WeaponPanelData } from "../Domain/WeaponPanelData";


//处理角色弹窗的逻辑
export class ChildWeaponPanel{

    DataBaseService;

    WeaponPanelData;

    WeaponPanelUI;


    constructor(DataBaseService,WeaponPanelUI){
        this.DataBaseService=DataBaseService;
        this.WeaponPanelUI=WeaponPanelUI;
    }

    //物品面板
    createWeaponPanelData(WeaponID:string){
        let WeaponInfo=this.getWeaponInfoByID(WeaponID);
        if(WeaponInfo){
            this.WeaponPanelData=new WeaponPanelData(WeaponInfo);
        }
    }

    closeWeaponPanel(){
        
    }

    SaveWeaponPanelData(){
        let WeaponData=this.WeaponPanelData.export();
        this.DataBaseService.setWeapon(WeaponData);
    }

    openWeaponPanel(WeaponID:string){
        this.createWeaponPanelData(WeaponID);

        this.WeaponPanelUI.open();
        this.WeaponPanelUI.syncInfo(this.WeaponPanelData);
    }


    getWeaponInfoByID(WeaponID:string){
        return this.DataBaseService.getWeapon(WeaponID);
    }

}