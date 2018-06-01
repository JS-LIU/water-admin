/**
 * Created by LDQ on 2018/6/1
 */

import NearStoreList from "./NearStoreList";
class MerchantOrder{
    constructor(orderInfo){
        this.orderId = orderInfo.orderId;
        this.orderNo = orderInfo.orderNo;
        this.orderSrc = orderInfo.orderSrc;
        this.orderSource = orderInfo.orderSource;
        this.createTime = orderInfo.createTime;
        this.productItems = orderInfo.productItems;
        this.receiver = orderInfo.receiver;
        this.userInfo = orderInfo.userInfo;
        this.deliveryAddress = orderInfo.deliveryAddress;
        this.totalPrice = orderInfo.totalPrice;
        this.payChannel = orderInfo.payChannel;
        this.nearStoreList = new NearStoreList();
    }

    getNearStore(){
        let locationInfo = {};
        return this.nearStoreList.getNearStoreList(locationInfo);
    }
}
module.exports = MerchantOrder;