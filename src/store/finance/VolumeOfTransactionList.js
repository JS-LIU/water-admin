/**
 * Created by LDQ on 2018/7/2
 */
// import _h from "../../Util/HB";
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import AdminList from '../AdminList';
import VolumeOfTransaction from './VolumeOfTransaction';
class VolumeOfTransactionList extends AdminList{
    constructor(){
        super();
        //  /admin/financial/turnoverOrderList
        let volumeOfTransactionListAjax = commonAjax.resource('/admin/financial/:action');
        this._getVolumeOfTransactionList = function(postInfo){
            return volumeOfTransactionListAjax.save({action:"turnoverOrderList"},postInfo)
        };

        //  /admin/financial/getTurnoverData
        this._getVolumeOfTransactionData = function(postInfo){
            return volumeOfTransactionListAjax.save({action:"getTurnoverData"},postInfo);
        };
        // this._getT
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
    getVolumeOfTransactionData(){
        let postInfo = {};
        return this._getVolumeOfTransactionData(postInfo);
    }
}
module.exports = new VolumeOfTransactionList();