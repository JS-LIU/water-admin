/**
 * Created by LDQ on 2017/12/20
 */
import {observable, computed,action,autorun} from 'mobx';
import QueryInfoBuilder from './QueryInfoBuilder';
import _h from '../Util/HB';

class ShopOrderCondition{
    constructor(){
        this._getShopOrderQueryInfo = function(postInfo){
            return _h.ajax.resource('/admin/order/queryMsg')
            .query({}, postInfo)
        };
    }
    @action getShopOrderQueryInfo(){
        this._getShopOrderQueryInfo({}).then((data)=>{
            this._queryCondition = data;
        });
    }
    @observable _queryCondition = [];
    @computed get queryCondition(){
        return this._queryCondition;
    }
    // @computed get postQueryMsg(){
    //     QueryInfoBuilder.convert(this._queryCondition);
    //
    // }



}
module.exports = ShopOrderCondition;