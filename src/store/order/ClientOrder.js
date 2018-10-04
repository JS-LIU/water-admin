// import _h from '../../Util/HB';
import {commonAjax} from '../../Util/huipayWaterBaseConfig';
import DeliveryMerchant from './DeliveryMerchant';
import nearShopListContainer from './NearShopListContainer';

class ClientOrder {
    constructor(orderInfo) {
        this.orderId = orderInfo.orderId;
        this.orderNo = orderInfo.orderNo;                                                           // 订单号
        this.orderSrc = orderInfo.orderSrc;
        this.orderSource = orderInfo.orderSource;                                                   // 订单来源
        this.createTime = orderInfo.createTime;                                                     // 订单时间
        this.payTime = orderInfo.payTime;
        this.productItems = orderInfo.productItems;                                                 // 商品名称
        this.receiver = orderInfo.receiver;                                                         // 收货人
        this.userInfo = orderInfo.userInfo;                                                         // 用户账号
        this.deliveryAddress = orderInfo.deliveryAddress;                                           // 收获地址
        this.totalPrice = orderInfo.totalPrice;                                                     // 实付金额
        this.payChannel = orderInfo.payChannel || "------";                                         // 支付方式
        this.promotionActivity = orderInfo.promotionActivity || "------";                           // 促销
        this.ticketUseNum = orderInfo.ticketUseNum;                                                 // 水票
        this.minusMount = orderInfo.minusMount;                                                     // 立减
        this.freight = orderInfo.freight || "------";                                               // 运费
        this.shopName = orderInfo.huibeiStoreName;                                                  // 配送商家
        this.deliveryShop = new DeliveryMerchant({
            longitude: orderInfo.longitude,
            latitude: orderInfo.latitude,
            shopName: orderInfo.huibeiStoreName,                                                    // 配送商家
            shopAddress: orderInfo.shopAddress,
            shopTelephone: orderInfo.shopTelephone || "------",                                     // 商家电话
            shopAlias: orderInfo.shopAlias,
            shopArtificialNum: orderInfo.shopArtificialNum,                                         // 商家编号
            shopId: orderInfo.shopId,
            cityName: orderInfo.cityName
        });
        this.cashSettleDownMount = orderInfo.cashSettleDownMount;
        this.deltaSettleDownValue = orderInfo.deltaSettleDownValue;
        this.actualSettleDownMount = orderInfo.actualSettleDownMount;
        this.orderStatus = orderInfo.status === "待派单" ? this.convertStatus() : orderInfo.status;  // 订单状态
        this.orderDetail = {};
        let clientOrderAjax = commonAjax.resource('/admin/order/:action');
        this._redirectClientOrder = function (postInfo) {
            return clientOrderAjax.save({action: "redirectShopOrder"}, postInfo);
        };
        this._getOrderDetail = function (postInfo) {
            return clientOrderAjax.save({action: 'shopOrderDetail'}, postInfo);
        };
        this._dispatchOrder = function (postInfo) {
            return clientOrderAjax.save({action: 'startDelivery'}, postInfo);
        };
        this._confirmReceipt = function(postInfo){
            return clientOrderAjax.save({action:'confirmOrder'},postInfo)
        }
    }

    convertStatus() {
        if (this.deliveryShop.shopId === 1 || this.deliveryShop.shopId === 2) {
            return "待指派"
        } else {
            return "待配送"
        }
    }
    setDeltaSettleDownValue(deltaSettleDownValue){
        this.deltaSettleDownValue = deltaSettleDownValue;
    }
    getPositionInfo() {
        let position = this.orderDetail.deliveryAddressModel.position;
        let cityName = this.orderDetail.deliveryAddressModel.address.cityName;
        return {
            latitude: position.latitude,
            longtitude: position.longitude,
            cityName: cityName
        }
    }

    redirectOrder(merchantShop) {
        let postInfo = {
            shopId: merchantShop.shopId,
            shopOrderId: this.orderId,
            deltaValueForSettleDown:this.deltaSettleDownValue
        };
        return this._redirectClientOrder(postInfo)
    }

    dispatchOrder(orderNo) {
        return this._dispatchOrder({orderNo: orderNo})
    }

    getDetail() {
        return new Promise((resolve, reject) => {
            this._getOrderDetail({shopOrderId: this.orderNo}).then((detail) => {
                this.orderDetail = detail;
                resolve(this.orderDetail);
            }).catch((err) => {
                reject(err);
            });
        })

    }

    getNearMerchantList() {
        let self = this;
        let locationInfo = this.getPositionInfo();
        let locationInfoAndOrderId = Object.assign(locationInfo, {orderId: self.orderId});
        return nearShopListContainer.getNearMerchantList(locationInfoAndOrderId);
    }
    confirmReceipt(){
        return this._confirmReceipt({
            orderNo:this.orderNo
        });
    }
}

module.exports = ClientOrder;