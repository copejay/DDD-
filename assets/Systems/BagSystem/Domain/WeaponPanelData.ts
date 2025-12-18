


export class WeaponPanelData{

    id:string;
    archiveTime:number;
    name:string;
    info:string;

    level:number;

    constructor(WeaponInfo){
        this.id=WeaponInfo.id;
        this.archiveTime=WeaponInfo.archiveTime;
        this.name=WeaponInfo.name;
        this.info=WeaponInfo.info;
        this.level=WeaponInfo.level;
    }
}