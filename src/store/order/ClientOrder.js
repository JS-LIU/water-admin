import _h from '../../Util/HB';
import DeliveryMerchant from './DeliveryMerchant';
import nearShopListContainer from './NearShopListContainer';
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
        this.orderStatus = orderInfo.status;

        this.deliveryShop = new DeliveryMerchant({
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

        let clientOrderAjax = _h.ajax.resource('/admin/order/:action');
        this._redirectClientOrder = function(postInfo){
            return clientOrderAjax.save({action:"redirectShopOrder"},postInfo);
        };
    }

    dispatchOrder(merchantShop) {
        let postInfo = {
            shopId: merchantShop.shopId,
            shopOrderId: this.orderId
        };
        return this._redirectClientOrder(postInfo)
    }
    getDetail(){
        return new Promise((resolve, reject)=>{
            resolve(this.orderInfo);
        }).catch((err)=>{
            reject(err);
        })
    }
    getNearMerchantList(){
        let locationInfo = this.deliveryShop.getMerchantAddressInfo();
        return nearShopListContainer.getNearMerchantList(locationInfo);
    }
}

module.exports = ClientOrder;