/**
 * Created by LDQ on 2018/6/28
 */
import AdminList from '../AdminList';
import ManufactureCost from './ManufactureCost';
class ManufactureCostList extends AdminList{
    constructor(){
        super();
        let manufactureCostList = _h.ajax.resource("/admin/stock/:action");
        this._getWaterTicketList = function(postInfo){
            return manufactureCostList.save({action:'findStockWaterPayList'},postInfo);
        };
        this.merchantList = merchantList;
    }

    getWaterTicketList(){
        let postInfo = this.getQueryMsg();
        return this.getList(postInfo,this._getWaterTicketList,ManufactureCost);
    }

}
module.exports = new ManufactureCostList();