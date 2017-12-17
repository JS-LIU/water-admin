/**
 * Created by LDQ on 2017/12/16
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';

class Order{
    constructor(){
        this.getOrder = function (postInfo) {
            return _h.ajax.resource('/admin/order/list')
                .save({}, postInfo)
        }
    }
    @observable orderInfo;
    @observable _queryInfoMsg = {};

    @action getOrderInfo(){
        this.getOrder({queryInfoMst:this._queryInfoMsg}).then((info)=>{
            console.log(info);
            this.orderInfo = info;
        });
    }
}
module.exports = Order;