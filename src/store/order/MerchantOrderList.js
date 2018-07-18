
import OrderList from './OrderList';
import MerchantOrder from "./MerchantOrder";
import AdminList from '../AdminList';
import _h from "../../Util/HB";

class MerchantOrderList extends AdminList{

    constructor(){
        super();
        this.orderType = "merchant_src";
        let orderListAjax = _h.ajax.resource('/admin/order/:action');

        this._getWaitingDispatchOrderList = function(postInfo){
            return orderListAjax.save({action:'waitingdispathlist'}, postInfo)
        };
        this.queryType = 0;
        this.orderStatus = ['create','delivery',"waiting_dispatch",'finish','finish_comment'];//    create,delivery,finish,finish_comment
        this._getOrderList = function(postInfo){
            return orderListAjax.save({action:"list"},postInfo);
        }
    }
    selectQueryType(typeNum){
        this.queryType = typeNum;
    }
    setOrderStatus(statusList){
        this.orderStatus = statusList;
    }
    getWaitingDispatchOrderList(){
        this.queryMsg = Object.assign(this.queryMsg,{queryType:this.queryType});
        this.queryMsg = {queryInfoMsg:this.queryMsg};
        let reqMsg = this.getQueryMsg({orderSrc: this.orderType});
        return this.getList(reqMsg,this._getWaitingDispatchOrderList,MerchantOrder);
    }
    getOrderList(){
        this.queryMsg = Object.assign(this.queryMsg,{orderStatus:this.orderStatus});
        this.queryMsg = {queryInfoMsg:this.queryMsg};
        let reqMsg = this.getQueryMsg({orderSrc:this.orderType});
        return this.getList(reqMsg,this._getOrderList,MerchantOrder);
    }
}
module.exports = new MerchantOrderList();