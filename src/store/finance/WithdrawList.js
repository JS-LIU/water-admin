/**
 * Created by LDQ on 2018/6/11
 */
import AdminList from '../AdminList';
import WithdrawItem from "./WithdrawItem";
import {commonAjax,exportExcelAjax} from '../../Util/huipayWaterBaseConfig';
import createExcel from '../../Util/CreateExcel';

class WithdrawList extends AdminList{
    constructor() {
        super();
        let withdrawAjax = commonAjax.resource("/admin/withdraw/:action");
        this.orderStatus = ['create',"rejected","finish"];              //  create,rejected,finish
        this._withdrawList = function(postInfo){
            return withdrawAjax.save({action:"list"},postInfo);
        };
        this.status = {
            "all":()=>{this.orderStatus = ['create',"rejected","finish"]},
            "waitWithdraw":()=>{this.orderStatus = ['create']},
            "finish":()=>{this.orderStatus = ['finish']}
        };
        let exportAjax = exportExcelAjax.resource('/admin/exportWithDrawOrder');
        this._exportExcel = function(postInfo){
            return exportAjax.save({}, postInfo)
        };
    }
    setStatus(status){
        return this.status[status]();
    }
    getWithdrawList(){
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus: this.orderStatus});
        let reqMsg = {queryInfoMsg:queryMsg};
        return this.getList(reqMsg,this._withdrawList,WithdrawItem);
    }
    getExcel(){
        let queryMsg = Object.assign({},this.queryMsg,{orderStatus: this.orderStatus});
        let reqMsg = {queryInfoMsg:queryMsg};
        let postInfo = Object.assign(reqMsg,this.pagination.getInfo());
        this._exportExcel(postInfo).then((response)=>{
            createExcel.setTitle("待提现");
            createExcel.downLoad(response);
        });
    }

}
module.exports = new WithdrawList();