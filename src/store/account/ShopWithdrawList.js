/**
 * Created by LDQ on 2018/6/14
 */
import _h from '../../Util/HB';
import AdminList from '../AdminList';
import WithdrawItem from '../finance/WithdrawItem';
class ShopWithdrawList extends AdminList{
    constructor(shopId){
        super();
        this.shopId = shopId;
        this.withdrawStatus = {orderStatus:['finish']};
        let withdrawAjax = _h.ajax.resource('/admin/withdraw/:action');
        this._getWithdrawList = function(postInfo){
            return withdrawAjax.save({action:"list"},postInfo);
        }
    }
    changeStatus(status){
        this.withdrawStatus = {
            orderStatus:[status]
        }
    }
    getWithdrawList(){
        let baseQueryInfo = Object.assign(this.withdrawStatus,{shopId:this.shopId});
        let queryInfo = this.getQueryMsg(baseQueryInfo);
        let reqMsg = {queryInfoMsg:queryInfo};
        return this.getList(reqMsg,this._getWithdrawList,WithdrawItem);
    }

}
module.exports = ShopWithdrawList;