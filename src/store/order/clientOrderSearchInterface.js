/**
 * Created by LDQ on 2018/6/19
 */
import {observable, computed, action, autorun} from "mobx";
import clientOrderList from './ClientOrderList';
import nearShopListContainer from './NearShopListContainer';

function clientOrderSearchActions(){
    let searchOrderListStrategy = {
        "all":function(queryMsg){
            let orderStatus = clientOrderList.setOrderStatus['create','delivery','finish','finish_comment'];
            clientOrderList.selectQueryMsg(queryMsg);

            clientOrderList.getOrderList().then((list)=>{

            })
        },
        "waitPay":function(queryMsg){

        }
    };
    //  fuck
    let searchOrderList = function(orderStatus,queryMsg){
        return searchOrderListStrategy[orderStatus](queryMsg);
    }
}