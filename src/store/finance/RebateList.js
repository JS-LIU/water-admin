/**
 * Created by LDQ on 2018/6/7
 */
// import _h from "../../Util/HB";
import {commonAjax,exportExcelAjax} from '../../Util/huipayWaterBaseConfig';
import AdminList from '../AdminList';
import RebateItem from './RebateItem';
import createExcel from '../../Util/CreateExcel';


class RebateList extends AdminList{
    constructor(){
        super();
        let rebateListAjax = commonAjax.resource('/admin/financial/:action');

        this._getRebateList = function(postInfo){
            return rebateListAjax.save({action:"getMonthRebateList"},postInfo);
        };
        let exportAjax = exportExcelAjax.resource('/admin/exportMonthRebate');
        this._exportExcel = function(postInfo){
            return exportAjax.save({}, postInfo)
        };
    }
    getRebateList(){
        return this.getList(this.queryMsg,this._getRebateList,RebateItem);
    }
    getExcel(){
        this._exportExcel(this.queryMsg).then((response)=>{
            createExcel.setTitle("当月返利");
            createExcel.downLoad(response);
        });
    }
}
module.exports = RebateList;