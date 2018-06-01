/**
 * Created by LDQ on 2018/6/1
 */
import _h from '../../Util/HB';
class NearStoreList{
    constructor(merchant){

        this._getNearStoreList = function(postInfo){
            return _h.ajax.resource('/admin/order/:action');
        }
    }
    getNearStoreList(locationInfo){
        let postInfo = Object.assign(locationInfo,{shopType:""});
        this._getNearStoreList().then(()=>{

        })
    }
}
module.exports = NearStoreList;