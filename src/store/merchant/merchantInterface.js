/**
 * Created by LDQ on 2018/6/14
 */
import {observable, computed, action, autorun} from "mobx";
import merchantListContainer from './MerchantListContainer';
import Merchant from './Merchant';

let merchantData = {
    @observable merchantInfo:{},

};

function merchantActions(){
    merchantListContainer.selectShopType("passStatus");
    let queryMerchant = function(queryInfo){
        merchantListContainer.pagination.setPage(1);
        merchantListContainer.selectQueryMsg(queryInfo);

        merchantListContainer.getMerchantList().then((list)=>{
            merchantData.merchantInfo = list[0];
        })
    };

    return {
        queryMerchant:queryMerchant,
    }

}
module.exports = {data:merchantData,actions:merchantActions()};