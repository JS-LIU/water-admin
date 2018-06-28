/**
 * Created by LDQ on 2018/6/22
 */
import {observable, computed, action, autorun} from "mobx";
import editProductList from './EditProductList';
let editProductData = {
    @observable list:[]
};
function editProductActions(){
    let getList = function(){
        editProductList.getStockList().then((list)=>{
            editProductData.list = list;
            editProductList.setActiveItem(list[0]);
        })
    };
    let operate = function(productId,operate){
        let product = editProductList.findItemByItemId(editProductData.list,productId,"productId");
        editProductList.setActiveItem(product);
        product.operate(operate)
    };

    return {
        getList:getList,
        operate:operate
    }
}
module.exports = {actions:editProductActions(),data:editProductData};