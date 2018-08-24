/**
 * Created by LDQ on 2018/6/7
 */
// import _h from "../../Util/HB";
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import AdminList from '../AdminList';
import RebateItem from './RebateItem';
class RebateList extends AdminList{
    constructor(){
        super();
        let rebateListAjax = commonAjax.resource('/admin/financial/:action');

        this._getRebateList = function(postInfo){
            return rebateListAjax.save({action:"getMonthRebateList"},postInfo);
        };
        this.rebateStatus = "create";
    }
    changeStatus(status){
        this.rebateStatus = status;
    }
    getRebateList(){
        let queryInfoMsg = this.getQueryMsg({rebateStatus:this.rebateStatus});
        return this.getList(queryInfoMsg,this._getRebateList,RebateItem);
    }
}
module.exports = RebateList;