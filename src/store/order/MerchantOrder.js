/**
 * Created by LDQ on 2018/6/1
 */
import _h from '../../Util/HB';
import NearStoreList from "./NearStoreList";
import DeliveryMerchant from './DeliveryMerchant';
class MerchantOrder{
    constructor(orderInfo){
        this.detail = orderInfo;
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
        this.deliveryMerchant = new DeliveryMerchant({
            longitude:orderInfo.longitude,
            latitude:orderInfo.latitude,
            shopName:orderInfo.shopName,
            shopAddress:orderInfo.shopAddress,
            shopTelephone:orderInfo.shopTelephone,
            shopAlias:orderInfo.shopAlias,
            shopArtificialNum:orderInfo.shopArtificialNum,
            shopId:orderInfo.shopId,
            cityName:orderInfo.cityName
        });
        this.nearStoreList = new NearStoreList();

        let merchantOrderAjax = _h.ajax.resource('/admin/order/:action');
        this._redirectOrder = function(postInfo){
            return merchantOrderAjax.save({action:"redirectShopOrder"},postInfo);
        }
    }

    getNearStore(){
        let locationInfo = this.deliveryMerchant.getMerchantAddressInfo();
        return this.nearStoreList.getNearStoreList(locationInfo);
    }
    dispatchOrder(deliveryMerchant) {
        let postInfo = {
            shopId: deliveryMerchant.shopId,
            shopOrderId: this.orderId
        };

        return this._redirectOrder(postInfo);
    }
    getDetail(){
        return new Promise((resolve, reject)=>{
            resolve(this.detail);
        }).catch((err)=>{
            reject(err);
        })
    }

}
module.exports = MerchantOrder;