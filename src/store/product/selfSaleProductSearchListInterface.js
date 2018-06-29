/**
 * Created by LDQ on 2018/6/25
 */
import {observable, computed, action, autorun} from "mobx";
import productSearchList from './ProductSearchList';
let productSearchListData = {
    @observable list:[],
};
function getProductSearchListActions(){
    let load = function(){
        productSearchList.getSelfSaleProductList().then((list)=>{
            productSearchListData.list = list;
        })
    };
    return {
        onLoad:load
    }
}
module.exports = {actions:getProductSearchListActions(),data:productSearchListData};
