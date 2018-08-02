/**
 * Created by LDQ on 2018/5/22
 */
import _h from '../../Util/HB';
import ProductList from '../product/ProductList';
import ShopOrderList from '../order/ShopOrderList';
import ShopAccount from '../account/ShopAccount';
import ShopActivityList from './ShopActivityList';
import AutoMap from '../../Util/huipayLocation/AutoMap';
class Merchant{
    constructor(merchantInfo){
        this.applyTime = merchantInfo.applyTime;                                        //  申请时间
        this.shopName = merchantInfo.shopName;                                          //  店铺名称
        this.merchantType = merchantInfo.merchantType||"------";                        //  店铺属性("personal","corporate")
        this.shopType = merchantInfo.shopType;                                          //  店铺属性("0 virtual_shop",friend_entity_shop(1, "旗舰店")software_used_entity_shop(2, "加V认证")shop_for_test(3, "测试店铺"),warehouse_shop(4, "水厂");//水厂)
        this.district = merchantInfo.address||"------";                                 //  所在地区
        this.addressDetail = merchantInfo.addressDetail||"------";                      //  详细地址
        this.serviceTel =  merchantInfo.serviceTel;                                     //  客服电话
        this.licenseImageUrl = merchantInfo.businessLicenseImageUr||"------";           //  营业执照
        this.managerName = merchantInfo.userName;                                       //  店长姓名
        this.managerTel = merchantInfo.telePhone;                                       //  联系人电话
        this.managerImgUrl = merchantInfo.idCardImageUrl;                               //  手持身份证照片
        this.auditStatus = Merchant.convertToAuditStatus(merchantInfo.merchantStatus);  //  审核状态
        this.merchantNumber = merchantInfo.merchantNumber;                              //  商户号
        this.shopArtificialNum = merchantInfo.shopArtificialNum;                        //  商家编号
        this.shopHeaderImg = merchantInfo.imgUrl;                                       //  店铺头像
        this.deliveryTime = merchantInfo.deliverTimeStr;                                //  配送时间
        this._deliveryStartTime = "9:00:00";
        this._deliveryEndTime = "17:00:00";
        this.deliveryRange = merchantInfo.distanceScope;                                //  配送范围
        this.deliveryMoney = merchantInfo.freight;                                      //  快递费用
        this.shopImg = merchantInfo.shopDetailImage;                                    //  店铺图片
        this.introduce = merchantInfo.presentation;                                     //  商家介绍
        this.auditor = merchantInfo.auditor;
        this.merchantId = merchantInfo.merchantId;
        this.shopId = merchantInfo.shopId;
        let merchantListAjax = _h.ajax.resource('/admin/merchant/:action');

        this._allow = function(postInfo){
            return merchantListAjax.save({action:'passStatus'},postInfo);
        };
        this._notAllow = function(postInfo){
            return merchantListAjax.save({action:'refuseStatus'},postInfo);
        };
        this._close = function(postInfo){
            return merchantListAjax.save({action:'closeShop'},postInfo);
        };
        this._toTop = function(){
            return merchantListAjax.save({action:'updateShopTop/'+this.shopId});
        };
        this._setArtificialInfo = function(postInfo){
            return merchantListAjax.save({action:'setShopArtificialInfo'},postInfo);
        };
        //  审核通过的店铺详情（如果该店铺通过审核）
        this._getAllowMerchantDetail = function(shopId){
            return merchantListAjax.save({action:'merchantShopDetail/'+shopId});
        };
        //  审核通过的店铺详情（如果该店铺尚未通过审核）
        this._getWaitAllowMerchantDetail = function(shopId){
            return merchantListAjax.query({action:'getShopCheckInfo/'+shopId});
        };
        let self = this;
        let detailStrategy ={
            "allow":self._getAllowMerchantDetail,
            "waitAllow":self._getWaitAllowMerchantDetail
        };


        this._getDetail = function(shopId){
            let status = this.auditStatus.status;
            return detailStrategy[status](shopId);
        };
        this.shopProductList = new ProductList(merchantInfo.shopId);

        //  商品列表
        this.shopOrderList = new ShopOrderList(merchantInfo.shopId);
        //  账户信息
        this.account = new ShopAccount(merchantInfo.shopId);
        this.shopActivityList = new ShopActivityList(merchantInfo.shopId);
        //  地图模块
        this.location = new AutoMap();
    }
    /**
     * 审核状态
     * @param status
     * @returns {*}
     */
    static convertToAuditStatus(status){
        if(status === "待审核"){
            return {status:"waitAllow",title:"待审核",operate:"去审核"}
        }else if(status === "已通过"){
            return {status:"allow",title:"已通过",operate:"已通过"}
        }else{
            return {status:"notAllow",title:"未通过",operate:"修改信息"}
        }
    }

    /**
     * 获取详细信息
     */
    getDetail(){
        return new Promise((resolve,reject)=>{
            this._getDetail(this.shopId).then((merchantDetail)=>{
                resolve(merchantDetail);
            }).catch((err)=>{
                reject(err);
            })
        });
    }

    /**
     * 通过审核
     * @returns {Promise}
     */
    allow(){
        return this._allow({id:this.merchantId})
    }

    /**
     * 拒绝审核
     */
    notAllow(){
        return this._notAllow({id:this.merchantId})
    }
    //  关闭店铺
    close(){
        return this._close({shopId:this.shopId});
    }
    toTop(){
        return this._toTop();
    }
    /**
     * 添加/修改 商家编号
     */
    updateMerchantNum(shopArtificialNum){
        return this._setArtificialInfo({shopId:this.shopId,shopArtificialNum:shopArtificialNum});
    }

    //  设置店铺详情图片
    setShopImg(picUrlList){
        console.log(picUrlList);
        this.shopImg = picUrlList;
    }
    //  设置店铺头像
    setShopHeaderImg(picUrl){
        this.shopHeaderImg = picUrl;
    }
    //  设置店铺名称
    setShopName(name){
        this.shopName = name;
    }
    //  设置配送时间
    _setDeliveryTime(startTime,endTime){
        this.deliveryTime = startTime+"~"+endTime;
    }
    setStartTime(startTimeStr){
        this._deliveryStartTime = startTimeStr;
        this._setDeliveryTime(startTimeStr,this._deliveryEndTime);
    }
    setEndTime(endTimeStr){
        this._deliveryEndTime = endTimeStr;
        this._setDeliveryTime(this._deliveryStartTime,endTimeStr);
    }
    //  设置配送范围
    setDeliveryRange(range){
        this.deliveryRange = range[1];
    }
    //  设置详细地址
    setAppendingAddress(address){
        this.appendingAddress = address;
    }
    setDeliveryMoney(money){
        this.deliveryMoney = money;
    }
    setLatitude(latitude){
        this.latitude = latitude;
    }
    setLongitude(longitude){
        this.longitude = longitude;
    }
    setMappingAddress(mappingAddress){
        this.mappingAddress = mappingAddress;
    }
    setIntroduce(discribe){
        this.introduce = discribe;
    }
    //  personal(0, "个人店铺"),corporate(1, "公司店铺");
    setMerchantType(type){
        this.merchantType = type;
    }
    //  用户电话
    setManagerTel(tel){
        this.managerTel = tel;
    }
    setServiceTel(telList){
        this.serviceTel = telList;
    }
    inputMappingAddress(str){
        return this.location.autoComplete(str);
    }
}
module.exports = Merchant;