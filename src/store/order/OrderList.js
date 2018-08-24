/**
 * Created by LDQ on 2018/4/28
 */
// import _h from '../../Util/HB';
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import Pagination from '../Pagination';
class OrderList{
    constructor(){

        let orderListAjax = commonAjax.resource('/admin/order/:action');
        this._getOrderListInfo = function (postInfo) {
            return orderListAjax.save({action:'waitingdispathlist'}, postInfo)
        };
        this.queryMsg = {
            queryType:0
        };
        this.pagination = new Pagination(10);
    }

    /**
     * 获取订单列表数据
     */
    getOrderListData(queryInfoMsg) {
        let postInfo = Object.assign({queryInfoMsg:queryInfoMsg},this.pagination.getInfo());
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
        Object.assign(this.queryMsg,queryMsg);
    }
    selectQueryType(type){
        this.queryMsg = {queryType:type};
    }
}
module.exports = OrderList;