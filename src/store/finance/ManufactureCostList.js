/**
 * Created by LDQ on 2018/6/28
 */
import AdminList from '../AdminList';
import ManufactureCost from './ManufactureCost';
import merchantListContainer from '../merchant/MerchantListContainer';
class ManufactureCostList extends AdminList{
    constructor(){
        super();
        let manufactureCostList = _h.ajax.resource("/admin/stock/:action");
        this._getWaterTicketList = function(postInfo){
            return manufactureCostList.save({action:'findStockWaterPayList'},postInfo);
        };
        //  水厂
        this.waterStoreList = merchantListContainer;
    }

    getWaterTicketList(){
        let postInfo = this.getQueryMsg();
        return this.getList(postInfo,this._getWaterTicketList,ManufactureCost);
    }

}
module.exports = new ManufactureCostList();