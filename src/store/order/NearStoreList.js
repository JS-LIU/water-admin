/**
 * Created by LDQ on 2018/6/1
 */
import _h from '../../Util/HB';
import DeliveryMerchant from './DeliveryMerchant';

class NearStoreList{
    constructor(){
        this._getNearStoreList = function(postInfo){
            return _h.ajax.resource('/admin/order/:action');
        }
    }
    getNearStoreList(locationInfo){
        let postInfo = Object.assign(locationInfo,{shopType:""});
        return new Promise((resolve,reject)=>{
            this._getNearStoreList().then((storeContainer)=>{
                let storeList = storeContainer.content;
                resolve();
            }).catch((err)=>{
                reject(err);
            })
        });

    }
}
module.exports = NearStoreList;