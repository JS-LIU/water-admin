/**
 * Created by LDQ on 2018/4/28
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../Util/HB';
import Pagination from './Pagination';
class OrderList{
    constructor(){

        let orderListAjax = _h.ajax.resource('/admin/order/:action');

        this._getOrderListInfo = function (postInfo) {
            return orderListAjax.save({action:'list'}, postInfo)
        };
        this.queryMsg = {};
        this.pagination = new Pagination(10);
    }

    /**
     * 获取订单信息
     */
    getOrderListData(queryInfoMsg) {
        console.log(this.pagination.info);
        let postInfo = Object.assign({queryInfoMsg:queryInfoMsg},this.pagination.info);
        return this._getOrderListInfo(postInfo)
    }

    /**
     * 选择查询订单信息
     * @param queryMsg
     */
    selectQueryMsg(queryMsg){
        this._setQueryMsg(queryMsg);
    }

    /**
     * 内部调用 设置查询条件
     * @param queryMsg
     * @private
     */
    _setQueryMsg(queryMsg){
        this.queryMsg = queryMsg;
    }
}
module.exports = OrderList;