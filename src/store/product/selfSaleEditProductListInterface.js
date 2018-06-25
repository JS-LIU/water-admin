/**
 * Created by LDQ on 2018/6/25
 */
import {observable, computed, action, autorun} from "mobx";
import editProductList from './EditProductList';
let editProductData = {
    @observable list:[]
};
function editProductActions(){
    let getList = function(){
        editProductList.getSelfSaleProductList().then((list)=>{
            editProductData.list = list;
            editProductList.setActiveItem(list[0]);
        })
    };
    let operate = function(productId,operate){
        let product = editProductList.findItemByItemId(editProductData.list,productId,"productId");
        editProductList.setActiveItem(product);
        editProductList.operate(operate)
    };
    //  todo 有查询条件后再加onLoad 在onLoad 传入参数重置查询信息
    return {
        getList:getList,
        operate:operate
    }
}
module.exports = {actions:editProductActions(),data:editProductData};