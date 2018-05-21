import _h from "../Util/HB";
import Pagination from "./Pagination";
import {observable, computed,action,autorun} from "mobx";
import MerchantShop from './MerchantShop';
import clientOrderList from './ClientOrderList';
/**
 * Created by LDQ on 2018/5/16
 */
class MerchantListContainer{
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
    }

    /**
     * 获取店铺列表数据(按条件查询数据)
     * @param queryInfoMsg
     */
    getMerchantListData(queryInfoMsg) {
        let postInfo = Object.assign({reqAdminShopQueryInfoMsg:queryInfoMsg},this.pagination.info);
        this._getMerchantListInfo(postInfo).then((merchantListContent)=>{

            let merchantList = merchantListContent.content;
            MerchantListContainer.createMerchantList(this._merchantList,merchantList);
        })
    }

    /**
     * 找到附近可以配送的店铺(按条件查询数据：接口不同)
     */
    @action getNearMerchantList() {
        let activeMerchant = clientOrderList.activeOrder.deliveryShop;
        //  根据订单状态判断是否可以重置派送店铺
        let addressInfo = activeMerchant.getMerchantAddressInfo();
        this._getNearMerchantList(addressInfo).then((merchantList)=>{
            this._merchantList = [];
            if(merchantList.length === 0){
                this.getMerchantListData({});
            }else{
                MerchantListContainer.createMerchantList(this._merchantList,merchantList);
            }
        })
    }

    /**
     * 构造店铺列表
     * @param merchantList
     * @param merchantDataList
     */
    static createMerchantList(merchantList,merchantDataList){
        for(let i = 0;i < merchantDataList.length;i++){
            let merchantShopData = MerchantListContainer.convertToMerchantShopData(merchantDataList[i]);
            merchantList.push(new MerchantShop(merchantShopData));
        }
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
            cityName: merchantShopInfo.cityName
        }
    }
    @observable _merchantList = [];
    @computed get merchantList(){
        return this._merchantList;
    }

    /**
     * 选择查询店铺的信息
     * @param queryMsg
     */
    selectQueryMsg(queryMsg){
        this._setQueryMsg(queryMsg);
    }

    /**
     * 内部调用 设置查询条件
     * @param queryMsg
     * @private
     */
    _setQueryMsg(queryMsg){
        this.queryMsg = queryMsg;
    }
}
module.exports = new MerchantListContainer();