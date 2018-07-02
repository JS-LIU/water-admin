/**
 * Created by LDQ on 2018/7/2
 */
import _h from "../../Util/HB";
import AdminList from '../AdminList';
import VolumeOfTransaction from './VolumeOfTransaction';
class VolumeOfTransactionList extends AdminList{
    constructor(){
        super();
        // /admin/financial/turnoverOrderList
        let volumeOfTransactionListAjax = _h.ajax.resource('/admin/financial/:action');
        this._getVolumeOfTransactionList = function(postInfo){
            return volumeOfTransactionListAjax.save({action:"turnoverOrderList"},postInfo)
        };
        //  merchant_src self_src client_src
        this.orderSrc = "merchant_src";
    }
    setOrderSrc(orderSrc){
        this.orderSrc = orderSrc;
        this.selectQueryMsg({})
    }

    getVolumeOfTransactionList(){
        this.queryMsg = Object.assign(this.queryMsg,{orderSrc:this.orderSrc});
        this.queryMsg = {queryInfoMsg:this.queryMsg};
        let reqMsg = this.getQueryMsg({orderSrc: this.orderType});
        return this.getList(reqMsg,this._getVolumeOfTransactionList,VolumeOfTransaction);
    }
}
module.exports = VolumeOfTransactionList;