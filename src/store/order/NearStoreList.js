/**
 * Created by LDQ on 2018/6/1
 */
import _h from '../../Util/HB';
import DeliveryMerchant from './DeliveryMerchant';

class NearStoreList{
    constructor(){
        this._getNearStoreList = function(postInfo){
            return _h.ajax.resource('/admin/order/:action').save({action:'wareHouseList'}, postInfo);
        };
        this.storeList = [];
    }
    getNearStoreList(locationInfo){
        this.storeList = [];
        return new Promise((resolve,reject)=>{
            this._getNearStoreList(locationInfo).then((storeListData)=>{
                this.storeList = NearStoreList.createStoreList(this.storeList,storeListData);
                resolve(this.storeList);
            }).catch((err)=>{
                reject(err);
            })
        });
    }
    static createStoreList(storeList,storeDataList){
        for(let i = 0;i < storeDataList.length;i++){
            storeList.push(new DeliveryMerchant(storeDataList[0]));
        }
        return storeList;
    }
}
module.exports = NearStoreList;