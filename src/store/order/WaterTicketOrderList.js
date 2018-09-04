/**
 * Created by LDQ on 2018/6/14
 */
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
class WaterTicketOrderList{
    constructor(shopId){
        this.shopId = shopId;
        let waterTicketAjax = commonAjax.resource('/admin/account/:action');
        this._getWaterTicketList = function(){
            return waterTicketAjax.save({action:shopId})
        }
    }
    getWaterTicketList(){
        return this._getWaterTicketList();
    }
}
module.exports = WaterTicketOrderList;