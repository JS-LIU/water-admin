/**
 * Created by LDQ on 2017/12/16
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import tableBuilder from './tableBuilder';

class Order{
    constructor(){
        this._getOrderInfo = function (postInfo) {
            return _h.ajax.resource('/admin/order/list')
            .save({}, postInfo)
        };
    }
    @observable _orderInfo = {content:[]};
    @observable _queryInfoMsg = {};

    @action getOrderInfo(){
        this._getOrderInfo({queryInfoMst:this._queryInfoMsg,page:0,size:1}).then((info)=>{
            this._orderInfo = info;
        });
    }

    @computed get columns (){
        if(this._orderInfo.content.length > 0){
            let title = this._orderInfo.content[0];
            return tableBuilder.convertToColumns(title);
        }
        return [];
    }
    @computed get dataSource(){
        return tableBuilder.convertToSource(this._orderInfo.content);
    }

}
module.exports = Order;
