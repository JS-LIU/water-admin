/**
 * Created by LDQ on 2018/1/5
 */
import {observable, action, computed,autorun} from 'mobx';
import _h from "../Util/HB";

class WithdrawOrderCondition{
    constructor(){
        this._getWithdrawOrderQueryInfo = function(postInfo){
            return _h.ajax.resource('/admin/withdraw/queryMsg')
            .query({}, postInfo)
        };
    }
    @action getWithdrawOrderQueryInfo(){
        this._getWithdrawOrderQueryInfo({}).then((data)=>{
            this._queryCondition = data;
        });
    }
    @observable _queryCondition = [];
    @computed get queryCondition(){
        return this._queryCondition;
    }
}

module.exports = WithdrawOrderCondition;