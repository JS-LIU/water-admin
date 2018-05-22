/**
 * Created by LDQ on 2018/5/22
 */
import {observable, computed, action, autorun} from "mobx";
import _h from "../Util/HB";
class MerchantManageShopList{
    constructor(){
        let merchantManageAjax = _h.ajax.resource('/admin/merchant/:action');
        this._getMerchantManageList = function(){

        };
        this.queryMsg = {

        }
    }
    selectQueryMsg(){

    }


}
module.exports = new MerchantManageShopList();