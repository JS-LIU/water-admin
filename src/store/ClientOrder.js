import {observable, computed, action, autorun} from "mobx";
import _h from '../Util/HB';
import OrderDetail from './OrderDetail';
import MerchantShop from './MerchantShop';
class ClientOrder {
    constructor(orderInfo) {
        this.orderInfo = orderInfo;
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

        this.deliveryShop = new MerchantShop({
            longitude: orderInfo.longitude,
            latitude: orderInfo.latitude,
            shopName: orderInfo.shopName,
            shopAddress: orderInfo.shopAddress,
            shopTelephone: orderInfo.shopTelephone,
            shopAlias: orderInfo.shopAlias,
            shopArtificialNum: orderInfo.shopArtificialNum,
            shopId: orderInfo.shopId,
            cityName: orderInfo.cityName
        });

    }

    dispatchOrder() {

    }

    @observable _orderDetail = this.orderInfo;
    @computed get orderDetail() {
        return new OrderDetail(this._orderDetail);
    }
    @observable _merchantShop = this.deliveryShop;
    @computed get merchantShop(){
        return this._merchantShop;
    }

}

module.exports = ClientOrder;