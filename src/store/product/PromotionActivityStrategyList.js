/**
 * Created by LDQ on 2018/6/25
 */
class PromotionActivityStrategyList{
    constructor(strategyList){
        this.strategyList = strategyList;
    }
    removeStrategy(index){
        this.strategyList.splice(index,1);
        return this.strategyList;
    }
    addStrategy(){

    }
}
module.exports = new PromotionActivityStrategyList();