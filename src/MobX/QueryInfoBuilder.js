/**
 * Created by LDQ on 2017/12/20
 */

import {observable, computed,action,autorun} from 'mobx';
import _h from '../Util/HB';

class QueryBuilder{
    constructor(){}
    @observable _queryMsg = {};
    @action addQueryInfo(queryCondition){
        Object.assign(this._queryMsg,queryCondition);
    }
    @computed get queryMsg(){
        return this._queryMsg;
    }


}
module.exports = QueryBuilder;