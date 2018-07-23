/**
 * Created by LDQ on 2018/6/1
 */
import _h from '../../Util/HB';
import nearStoreList from "./NearStoreList";
import DeliveryMerchant from './DeliveryMerchant';
class MerchantOrder{
    constructor(orderInfo){
        this.orderId = orderInfo.orderId;
        this.orderNo = orderInfo.orderNo;// 订单号
        this.orderSrc = orderInfo.orderSrc;
        this.orderSource = orderInfo.orderSource;// 订单来源
        this.createTime = orderInfo.createTime;// 订单时间
        this.productItems = orderInfo.productItems;// 商品数量规格单价
        this.receiver = orderInfo.receiver;// 收货人
        this.userInfo = orderInfo.userInfo;// 用户账号
        this.deliveryAddress = orderInfo.deliveryAddress;// 收货地址
        this.totalPrice = orderInfo.totalPrice;// 实付金额
        this.payChannel = orderInfo.payChannel||"------";// 支付方式
        this.receiverShopName = orderInfo.buyShopName;
        this.shopArtificialNum = orderInfo.shopArtificialNum;
        this.shopAlias = orderInfo.shopAlias;
        this.promotionActivity = orderInfo.promotionActivity||"------";// 促销
        this.ticketUseNum = orderInfo.ticketUseNum;// 水票
        this.minusMount = orderInfo.minusMount;// 立减
        this.freight = orderInfo.freight;// 运费
        this.deliveryMerchant = new DeliveryMerchant({
            longitude:orderInfo.longitude,
            shopAlias:orderInfo.shopAlias,
            shopArtificialNum:orderInfo.shopArtificialNum,// 商家编号
            latitude:orderInfo.latitude,
            shopName:orderInfo.huibeiStoreName,// 配送商家
            shopAddress:orderInfo.shopAddress,
            shopTelephone:orderInfo.shopTelephone||"------",// 商家电话
            shopId:orderInfo.shopId,
            cityName:orderInfo.cityName
        });
        this.orderStatus = orderInfo.status;// 订单状态
        this.detail = {};
        let merchantOrderAjax = _h.ajax.resource('/admin/order/:action');
        this._redirectOrder = function(postInfo){
            return merchantOrderAjax.save({action:"redirectShopOrder"},postInfo);
        };
        this._getOrderDetail = function(postInfo){
            return merchantOrderAjax.save({action:'shopOrderDetail'},postInfo)
        };
        this._dispatchOrder = function(postInfo){
            return merchantOrderAjax.save({action:'startDelivery'},postInfo)
        }
    }

    getNearStore(){
        let self = this;
        let locationInfo = this.deliveryMerchant.getMerchantAddressInfo();
        let locationInfoAndOrderId = Object.assign(locationInfo,{orderId:self.orderId});
        return nearStoreList.getNearStoreList(locationInfoAndOrderId);
    }
    redirectOrder(deliveryMerchant) {
        let postInfo = {
            shopId: deliveryMerchant.shopId,
            shopOrderId: this.orderId
        };

        return this._redirectOrder(postInfo);
    }
    dispatchOrder(orderNo){
        return this._dispatchOrder({orderNo:orderNo})
    }
    getDetail(){
        return new Promise((resolve, reject)=>{
            this._getOrderDetail({shopOrderId:this.orderNo}).then((detail)=>{
                this.orderDetail = detail;
                resolve(this.orderDetail);
            }).catch((err)=>{
                reject(err);
            });
        })
    }


}
module.exports = MerchantOrder;