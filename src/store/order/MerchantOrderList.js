
import MerchantOrder from "./MerchantOrder";
import AdminList from '../AdminList';
import {commonAjax,exportExcelAjax} from '../../Util/huipayWaterBaseConfig';
import createExcel from '../../Util/CreateExcel';


class MerchantOrderList extends AdminList{

    constructor(){
        super();
        this.orderType = "merchant_src";
        let orderListAjax = commonAjax.resource('/admin/order/:action');

        this._getWaitingDispatchOrderList = function(postInfo){
            return orderListAjax.save({action:'waitingdispathlist'}, postInfo)
        };
        this.queryType = 0;
        this.orderStatus = ['create','delivery',"waiting_dispatch",'finish','finish_comment'];//    create,delivery,finish,finish_comment
        this._getOrderList = function(postInfo){
            return orderListAjax.save({action:"list"},postInfo);
        };
        this._getOrderPayInfo = function(postInfo){
            return orderListAjax.save({action:"payInfo"},postInfo);
        };

        let exportsAjax = commonAjax.resource('/admin/exportShopOrder');
        this._getExcel = function(data){
            return exportsAjax.save({},data);
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
        let reqMsg = {queryInfoMsg:queryMsg};
        return this.getList(reqMsg,this._getWaitingDispatchOrderList,MerchantOrder);
    }
    getOrderList(){
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus:this.orderStatus},{orderSrc: this.orderType});
        let reqMsg = {queryInfoMsg:queryMsg};
        return this.getList(reqMsg,this._getOrderList,MerchantOrder);
    }
    getOrderPayInfo(){
        return this._getOrderPayInfo({queryInfoMsg:{orderSrc: this.orderType}});
    }

    getExcel(){
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus:this.orderStatus},{orderSrc: this.orderType});
        let reqMsg = {queryInfoMsg:queryMsg};
        let postInfo = Object.assign(reqMsg,this.pagination.getInfo());
        this._exportExcel(postInfo).then((response)=>{
            createExcel.setTitle("订单流水");
            createExcel.downLoad(response);
        });
    }

}
module.exports = new MerchantOrderList();