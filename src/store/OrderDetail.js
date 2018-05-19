/**
 * Created by LDQ on 2018/5/12
 */
import {observable, computed,action,autorun} from "mobx";
class OrderDetail {
    constructor(orderInfo) {
        this.orderInfo = orderInfo;
        this.orderId = orderInfo.orderId;
        this.orderNo = orderInfo.orderNo;
        this.orderSrc = orderInfo.orderSrc;
        this.createTime = orderInfo.createTime;
        this.productItems = orderInfo.productItems;
        this.receiver = orderInfo.receiver;
        this.userInfo = orderInfo.userInfo;
        this.deliveryAddress = orderInfo.deliveryAddress;
        this.totalPrice = orderInfo.totalPrice;
        this.status = orderInfo.status;
        this.shopName = orderInfo.shopName;
        this.shopAddress = orderInfo.shopAddress;
        this.shopTelephone = orderInfo.shopTelephone;
        this.shopAlias = orderInfo.shopAlias;
        this.shopId = orderInfo.shopId;
    }
}
module.exports = OrderDetail;