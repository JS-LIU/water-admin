/**
 * Created by LDQ on 2017/12/20
 */

class QueryBuilder{
    constructor(){
        this.queryMsg = {};
        this.createQueryInfoStrategies = {
            "eq":function(key,value){
                return {
                    [key]:value
                }
            },
            "eqOr":function(key,allValues,indexList){
                let usedValue = [];
                for(let i =0;i < indexList.length; i++){
                    let j = indexList[i];
                    usedValue.push(allValues[j]);
                }
                return {
                    [key]:usedValue
                }
            },
            "between":function(keys,values){
                let info = {};
                for(let i = 0;i < keys.length;i++){
                    info = Object.assign(info,{
                        [keys[i]]:values[i]
                    });
                }
                return info;
            }
        }
    }
    addQueryInfo(queryCondition){
        this.queryMsg = Object.assign(this.queryMsg,queryCondition);
    }
    createQueryInfo(strategy,...arg){
        let queryInfo = this.createQueryInfoStrategies[strategy](...arg);
        this.addQueryInfo(queryInfo);
    }
}
module.exports = QueryBuilder;