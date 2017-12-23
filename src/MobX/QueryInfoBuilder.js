/**
 * Created by LDQ on 2017/12/20
 */

class QueryBuilder{
    constructor(){
        this.queryMsg = {};
    }
    addQueryInfo(queryCondition){
        this.queryMsg = Object.assign(this.queryMsg,queryCondition);
    }
}
module.exports = QueryBuilder;