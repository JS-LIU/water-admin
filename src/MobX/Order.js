/**
 * Created by LDQ on 2017/12/16
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import tableBuilder from './tableBuilder';
import Pagination from './Pagination';
class Order{
    constructor(){
        this._getOrderInfo = function (postInfo) {
            return _h.ajax.resource('/admin/order/list')
            .save({}, postInfo)
        };
        this._pagination = new Pagination(10);
        this.queryInfoMsg = {};

    }
    @observable _orderInfo = {content:[]};

    @action getOrderInfo(pageNumber = 1){
        this._pagination.setPage(pageNumber);
        let msg = this.queryInfoMsg;
        let postInfo = Object.assign(this.pagination.info,{
            queryInfoMsg:msg
        });

        this._getOrderInfo(postInfo).then((info)=>{
            this._orderInfo = info;
            this._pagination.setTotal(info.totalElements);
        });
    }
    @observable _pagination;
    @computed get pagination(){
        return this._pagination;
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
