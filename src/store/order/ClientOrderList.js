/**
 * Created by LDQ on 2018/4/28
 */

import ClientOrder from './ClientOrder';
import AdminList from '../AdminList';
import _h from "../../Util/HB";
class ClientOrderList extends AdminList{
    constructor(){
        super();
        this.orderType = "client_src";
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
        let queryMsg = Object.assign({},this.queryMsg,{queryType:this.queryType},{orderSrc: this.orderType});
        let reqMsg = this.getQueryMsg({queryInfoMsg:queryMsg});
        return this.getList(reqMsg,this._getWaitingDispatchOrderList,ClientOrder);
    }
    getOrderList(){
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus:this.orderStatus},{orderSrc: this.orderType});
        let reqMsg = this.getQueryMsg({queryInfoMsg:queryMsg});
        return this.getList(reqMsg,this._getOrderList,ClientOrder);
    }

}

module.exports = new ClientOrderList();