/**
 * Created by LDQ on 2018/6/13
 */
import AdminList from '../AdminList';
// import _h from '../../Util/HB';
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import Order from "../order/Order";

class ShopOrderList extends AdminList{
    constructor(shopId){
        super();
        this.shopId = shopId;
        this.orderSrc = "merchant_src";
        let shopOrderAjax = commonAjax.resource('/admin/order/:action');
        this._getShopOrderList = function(postInfo){
            return shopOrderAjax.save({action:"shopOrderList"},postInfo);
        }
    }
    changeOrderSrc(orderSrc){
        this.orderSrc = orderSrc;
    }
    getOrderList(){
        let queryInfo = this.getQueryMsg({shopId:this.shopId,orderSrc:this.orderSrc});
        return this.getList(queryInfo,this._getShopOrderList,Order);
    }
}
module.exports = ShopOrderList;