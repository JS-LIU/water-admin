/**
 * Created by LDQ on 2018/9/17
 */
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import AdminList from '../AdminList';
import ReceiveWaterTicketItem from "./ReceiveWaterTicketItem";
import Active from './Active';
class WaterTicketActiveList extends AdminList{
    constructor(){
        super();
        let waterTicketListAjax = commonAjax.resource('/activity/:action');
        this._getWaterTicketList = function(postInfo){
            return waterTicketListAjax.save({action:"acceptDetail"},postInfo);
        };
        this._getActiveList = function(postInfo){
            return waterTicketListAjax.save({action:"getActivityList"},postInfo);
        };
        this.activityMode = "online";
        this.activeTicketList = [];
    }
    getWaterTicketList(){
        let queryInfoMsg = this.getQueryMsg({activityMode:this.activityMode });
        return this.getList(queryInfoMsg,this._getWaterTicketList,ReceiveWaterTicketItem);
    }
    getActiveTicketList(){
        this.activeTicketList = [];
        return new Promise((resolve,reject)=>{
            this._getActiveList({activityMode:this.activityMode}).then((list)=>{
               this.activeTicketList = WaterTicketActiveList.createList(this.activeTicketList,list,Active);
                resolve(this.activeTicketList);
            })
        });
    }
    setActivityMode(mode){
        this.activityMode = mode;
    }

}
module.exports = new WaterTicketActiveList();