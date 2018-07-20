/**
 * Created by LDQ on 2018/6/11
 */
import AdminList from '../AdminList';
import _h from "../../Util/HB";
import WithdrawItem from "./WithdrawItem";

class WithdrawList extends AdminList{
    constructor() {
        super();
        let withdrawAjax = _h.ajax.resource("/admin/withdraw/:action");
        this.orderStatus = ['create',"rejected","finish"];              //  create,rejected,finish
        this._withdrawList = function(postInfo){
            return withdrawAjax.save({action:"list"},postInfo);
        };
        this.status = {
            "all":()=>{this.orderStatus = ['create',"rejected","finish"]},
            "waitWithdraw":()=>{this.orderStatus = ['create']},
            "finish":()=>{this.orderStatus = ['finish']}
        }
    }
    setStatus(status){
        return this.status[status]();
    }
    getWithdrawList(){
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus: this.orderStatus});
        let reqMsg = {queryInfoMsg:queryMsg};
        return this.getList(reqMsg,this._withdrawList,WithdrawItem);
    }

}
module.exports = new WithdrawList();