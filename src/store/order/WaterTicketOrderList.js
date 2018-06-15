/**
 * Created by LDQ on 2018/6/14
 */
import _h from '../../Util/HB';
class WaterTicketOrderList{
    constructor(shopId){
        this.shopId = shopId;
        let waterTicketAjax = _h.ajax.resource('/admin/account/:action');
        this._getWaterTicketList = function(){
            return waterTicketAjax.save({action:shopId})
        }
    }
    getWaterTicketList(){
        return this._getWaterTicketList();
    }
}
module.exports = WaterTicketOrderList;