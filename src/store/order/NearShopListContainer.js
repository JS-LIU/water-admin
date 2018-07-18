/**
 * Created by LDQ on 2018/5/16
 */
import _h from "../../Util/HB";
import Pagination from "../Pagination";
import DeliveryMerchant from './DeliveryMerchant';
class NearShopListContainer{
    constructor(){
        let merchantListAjax = _h.ajax.resource('/admin/order/:action');

        this._getMerchantListInfo = function (postInfo) {
            return merchantListAjax.save({action:'assignShopQueryList'}, postInfo)
        };
        this._getNearMerchantList = function (postInfo) {
            return merchantListAjax.save({action:'assignShopList'}, postInfo)
        };
        this.queryMsg = {};
        this.pagination = new Pagination(10);
        this.nearShopList = [];
    }

    /**
     * 获取店铺列表数据(按条件查询数据)
     * @param queryInfoMsg
     */
    getMerchantListByQueryInfo(queryInfoMsg) {
        let postInfo = Object.assign({reqAdminShopQueryInfoMsg:queryInfoMsg},this.pagination.info);
        this.nearShopList = [];
        return new Promise((resolve,reject)=>{
            this._getMerchantListInfo(postInfo).then((merchantListContent)=>{

                let merchantListData = merchantListContent.content;
                this.nearShopList = NearShopListContainer.createMerchantList(this.nearShopList,merchantListData);
                resolve(this.nearShopList);
            }).catch((err)=>{
                reject(err);
            })
        })

    }

    /**
     * 找到附近可以配送的店铺(按条件查询数据：接口不同)
     */
    getNearMerchantList(locationInfoAndOrderId) {
        this.nearShopList = [];
        return new Promise((resolve, reject)=>{
            this._getNearMerchantList(locationInfoAndOrderId).then((merchantList)=>{
                this.nearShopList = NearShopListContainer.createMerchantList(this.nearShopList,merchantList);
                this.nearShopList.sort((shop,otherShop)=>{
                    return shop.distance - otherShop.distance
                });
                resolve(this.nearShopList);
            }).catch((err)=>{
                reject(err);
            })
        });
    }

    /**
     * 构造店铺列表
     * @param merchantList
     * @param merchantDataList
     */
    static createMerchantList(merchantList,merchantDataList){
        for(let i = 0;i < merchantDataList.length;i++){
            let merchantShopData = NearShopListContainer.convertToMerchantShopData(merchantDataList[i]);
            merchantList.push(new DeliveryMerchant(merchantShopData));
        }
        return merchantList;
    }

    static convertToMerchantShopData(merchantShopInfo) {
        return {
            longitude: merchantShopInfo.longitude,
            latitude: merchantShopInfo.latitude,
            shopName: merchantShopInfo.name,
            shopAddress: merchantShopInfo.address,
            shopTelephone: merchantShopInfo.shopMobile,
            shopAlias: merchantShopInfo.shopAlias,
            shopArtificialNum: merchantShopInfo.shopArtificialNum,
            shopId: merchantShopInfo.shopId,
            cityName: merchantShopInfo.cityName,
            distance: merchantShopInfo.distance,
            certification: merchantShopInfo.certification
        }
    }

    /**
     * 选择查询店铺的信息
     * @param queryMsg
     */
    selectQueryMsg(queryMsg){
        this.queryMsg = queryMsg;
    }

    findMerchantById(list,merchantId){
        return list.find((merchant)=>{
            return merchant.shopId === merchantId;
        })
    }
}
module.exports = new NearShopListContainer();