

import { RoleRow } from "../../../GlobalService";

export class FormationPop{


    private TrainEntryUI;

    private DataBaseService;

    private HintPopApp;

    private ChooseRoleID;

    constructor(TrainEntryUI,HintPopApp,DataBaseService){
        this.TrainEntryUI=TrainEntryUI;
        this.HintPopApp=HintPopApp;
        this.DataBaseService=DataBaseService;
    }

    setChooseRoleID(RoleID){
        this.ChooseRoleID=RoleID;
    }

    openFormationPop(){
        let formation=this.DataBaseService.getFormation();

        let formationDisplayInfo=this.FormationDisplayInfo(formation);
        this.TrainEntryUI.openFormationPop(formationDisplayInfo);
    }

    checkFormationLongOk(){
        let formation=this.DataBaseService.getFormation();
        if(formation.length>=5){
            console.error(`TrainApplication-FormationPop:角色列阵最多只能有5个角色`);
            return false;
        }
        return true;
    }

    DownRoleClick(){
        // let formation=this.DataBaseService.getFormation();
        // let HadDown=false;
        // for (let i = formation.length - 1; i >= 0; i--) {
        //     if (formation[i].id === this.ChooseRoleID) {
        //         formation.splice(i, 1);
        //         HadDown=true;
        //     }
        // }
        // this.DataBaseService.setFormation(formation);
        let HadDown=this.DownFormationRoleByID(this.ChooseRoleID);

        let formation=this.DataBaseService.getFormation();
        let formationDisplayInfo=this.FormationDisplayInfo(formation);
        // let formation=this.DataBaseService.getFormation();
        this.TrainEntryUI.openFormationPop(formationDisplayInfo);
        return HadDown;
    }

    AddFormationRole(RoleID,CellNum){
        let formation=this.DataBaseService.getFormation();
        let site=this.CellToSite(CellNum);
        formation.push({id:RoleID,site:site});
        this.DataBaseService.setFormation(formation);
    }

    DownFormationRoleByID(RoleID){
        let formation=this.DataBaseService.getFormation();
        let HadDown=false;
        for (let i = formation.length - 1; i >= 0; i--) {
            if (formation[i].id === RoleID) {
                formation.splice(i, 1);
                HadDown=true;
            }
        }
        this.DataBaseService.setFormation(formation);
        return HadDown;
    }

    getFormationRoleSiteByRoleID(RoleID){
        let formation=this.DataBaseService.getFormation();
        let site={x:-1,y:1};
        formation.forEach((role)=>{
            if(role.id==RoleID){
                site=role.site;
            }
        })
        return site;
    }

    getFormationRoleIDByCellID(CellID){
        let formation=this.DataBaseService.getFormation();
        let RoleID="null";
        formation.forEach((role)=>{
            if(role.site.x==this.CellToSite(CellID).x&&role.site.y==this.CellToSite(CellID).y){
                RoleID=role.id;
            }
        })
        return RoleID;
    }

    checkRoleInFormation(RoleID){
        let HadRole=false;
        let formation=this.DataBaseService.getFormation();
        formation.forEach((role)=>{
            if(role.id==RoleID){
                HadRole=true;
            }
        })
        return HadRole;
    }

    checkSiteHadRole(CellID){
        let formation=this.DataBaseService.getFormation();
        let HadRole=false;
        formation.forEach((role)=>{
            if(role.site.x==this.CellToSite(CellID).x&&role.site.y==this.CellToSite(CellID).y){
                HadRole=true;
            }
        })
        return HadRole;
    }


//这里需要处理角色列阵时的各种情况，该角色是否位于阵容中，点击的阵容位置是否有人
    FormationCellClick(CellID){

        console.log("TrainApplication: 角色列阵",this.ChooseRoleID);
        if(this.checkRoleInFormation(this.ChooseRoleID)==true){
            if(this.checkSiteHadRole(CellID)==false){
                this.DownFormationRoleByID(this.ChooseRoleID);
                this.AddFormationRole(this.ChooseRoleID,CellID);
            }else{
                let mySite=this.getFormationRoleSiteByRoleID(this.ChooseRoleID);
                let oldRoleID=this.getFormationRoleIDByCellID(CellID);

                this.DownFormationRoleByID(this.ChooseRoleID);
                this.DownFormationRoleByID(oldRoleID);

                this.AddFormationRole(this.ChooseRoleID,CellID);
                let this_formation=this.DataBaseService.getFormation();
                let oldFormation={id:oldRoleID,site:mySite};
                this_formation.push(oldFormation);
                this.DataBaseService.setFormation(this_formation);
            }
        //角色不在阵容情况
        }else{
            if(this.checkSiteHadRole(CellID)==true){
                let oldRoleID=this.getFormationRoleIDByCellID(CellID);
                this.DownFormationRoleByID(oldRoleID);
                this.AddFormationRole(this.ChooseRoleID,CellID);
            }else{
                let longOk=this.checkFormationLongOk();
                if(longOk==true){
                    this.AddFormationRole(this.ChooseRoleID,CellID);
                }else if(longOk==false){
                    console.error(`TrainApp-FormationPop:阵容已满`);
                    this.HintPopApp.createHintPop("阵容已满,无法添加！");
                }
                // this.AddFormationRole(this.ChooseRoleID,CellID);
            }
        }
        // this.DataBaseService.setFormation(formation);

        let formation=this.DataBaseService.getFormation();
        let formationDisplayInfo=this.FormationDisplayInfo(formation);
        // let formation=this.DataBaseService.getFormation();
        this.TrainEntryUI.openFormationPop(formationDisplayInfo);
    }

    FormationDisplayInfo(formation){
        let formationDisplayInfo=formation.map((role)=>{
            return {name:this.RoleIdToName(role.id),site:role.site};
        })
        return formationDisplayInfo;
    }

    RoleIdToName(RoleID){
        let Role:RoleRow=this.DataBaseService.getRole(RoleID);
        return Role.baseInfo.name;
    }

    CellToSite(CellID:number){
        if(CellID>8){
            console.error(`TrainApplication: 超过范围！`);
        }
        let site={x:CellID%3-3,y:Math.floor(CellID/3)+1};
        return site;
    }


}