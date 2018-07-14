/**
 * Created by LDQ on 2018/6/7
 */
import _h from "../../Util/HB";
import AdminList from '../AdminList';
import Pagination from "../Pagination";
import RebateItem from './RebateItem';
class RebateList extends AdminList{
    constructor(){
        super();
        let rebateListAjax = _h.ajax.resource('/admin/financial/:action');

        this._getRebateList = function(postInfo){
            return rebateListAjax.save({action:"getMonthRebateList"},postInfo);
        };
        this.pagination = new Pagination(10);
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