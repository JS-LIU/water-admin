/**
 * Created by LDQ on 2018/6/14
 */
import {observable, computed, action, autorun} from "mobx";
import merchantListContainer from './MerchantListContainer';
import Merchant from './Merchant';

let merchantData = {
    @observable merchant:{},                //  店铺信息
    @observable productList:[],             //  店铺商品
    @observable buyOrderList:[],            //  进货订单
    @observable saleOrderList:[],           //  销售订单
    @observable waterTicketOrderList:[], //  水票款
    @observable withdrawList:[]          //  提现
};

function merchantActions(){
    merchantListContainer.selectShopType("passStatus");
    let queryMerchant = function(queryInfo){
        merchantListContainer.pagination.setPage(1);
        merchantListContainer.selectQueryMsg(queryInfo);

        merchantListContainer.getMerchantList().then((list)=>{
            merchantData.merchant = list[0];
            return merchantData.merchant.getDetail();
        }).then((detail)=>{
            merchantData.detail = detail;
            return merchantData.merchant.shopProductList.getProductList();
        }).then((list)=>{
            merchantData.productList = list;
        })
    };
    let getMerchantProduct = function(){
        merchantData.merchant.shopProductList.getProductList().then((list)=>{
            merchantData.productList = list;
        })
    };
    let getBuyOrder = function(){
        merchantData.merchant.shopOrderList.changeOrderSrc = "merchant_src";
        merchantData.merchant.shopOrderList.getOrderList().then((orderList)=>{
            merchantData.buyOrderList = orderList;
        });
    };
    let getSaleOrder = function(){
        merchantData.merchant.shopOrderList.changeOrderSrc = "client_src";
        merchantData.merchant.shopOrderList.getOrderList().then((orderList)=>{
            merchantData.buyOrderList = orderList;
        });
    };
    let getWaterTicketOrderList = function(){
        merchantData.merchant.account.waterTicketOrderList.getWaterTicketList().then((list)=>{
            merchantData.waterTicketOrderList = list;
        });
    };
    let getWithdrawList = function(){
        merchantData.merchant.account.withdrawList.changeStatus('finish');
        merchantData.merchant.account.withdrawList.getWithdrawList().then((list)=>{
            merchantData.waterTicketOrderList = list;
        });
    };


    return {
        queryMerchant:queryMerchant,                    //  获取店铺
        getMerchantProduct:getMerchantProduct,          //  获取店铺商品
        getBuyOrder:getBuyOrder,                        //  获取进货订单
        getSaleOrder:getSaleOrder,                      //  获取销售订单
        getWaterTicketOrderList:getWaterTicketOrderList,//  获取水票款
        getWithdrawList:getWithdrawList                 //  获取提现详情
    }

}
module.exports = {data:merchantData,actions:merchantActions()};