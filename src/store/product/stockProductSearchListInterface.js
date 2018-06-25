/**
 * Created by LDQ on 2018/6/22
 */
import {observable, computed, action, autorun} from "mobx";
import productSearchList from './ProductSearchList';
let productSearchListData = {
    @observable list:[],
};
function getProductSearchListActions(){
    let load = function(){
        productSearchList.getProductSearchList().then((list)=>{
            productSearchListData.list = list;
        })
    };
    return {
        onLoad:load
    }
}
module.exports = {actions:getProductSearchListActions(),data:productSearchListData};
