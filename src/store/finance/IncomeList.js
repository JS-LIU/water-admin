/**
 * Created by LDQ on 2018/7/3
 */
import AdminList from '../AdminList';
// import _h from '../../Util/HB';
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import Income from './Income';
class IncomeList extends AdminList{
    constructor(){
        super();
        let incomeListAjax = commonAjax.resource('/admin/financial/:action');
        this._getIncomeList = function(postInfo){
            return incomeListAjax.save({action:"getStockInfoList"},postInfo)
        };
        this._getIncomeData = function(postInfo){
            return incomeListAjax.save({action:"getRevenueInfo"},postInfo);
        }
    }
    getIncomeList(){
        let postInfo = this.getQueryMsg();
        return this.getList(postInfo,this._getIncomeList,Income);
    }
    getIncomeData = function(){
        let postInfo = {};
        return this._getIncomeData(postInfo);
    }
}
module.exports = new IncomeList();