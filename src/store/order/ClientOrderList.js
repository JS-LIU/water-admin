/**
 * Created by LDQ on 2018/4/28
 */

import ClientOrder from './ClientOrder';
import AdminList from '../AdminList';
import {commonAjax,exportExcelAjax} from '../../Util/huipayWaterBaseConfig';
import createExcel from '../../Util/CreateExcel';

class ClientOrderList extends AdminList{
    constructor(){
        super();
        this.orderType = "client_src";
        let orderListAjax = commonAjax.resource('/admin/order/:action');

        this._getWaitingDispatchOrderList = function(postInfo){
            return orderListAjax.save({action:'waitingdispathlist'}, postInfo)
        };
        let exportAjax = exportExcelAjax.resource('/admin/exportShopOrder');
        this._exportExcel = function(postInfo){
            return exportAjax.save({}, postInfo)
        };


        this.queryType = null;
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
        let reqMsg = {queryInfoMsg:queryMsg};
        return this.getList(reqMsg,this._getWaitingDispatchOrderList,ClientOrder);
    }
    getOrderList(){
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus:this.orderStatus},{orderSrc: this.orderType});
        let reqMsg = {queryInfoMsg:queryMsg};
        return this.getList(reqMsg,this._getOrderList,ClientOrder);
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

module.exports = new ClientOrderList();