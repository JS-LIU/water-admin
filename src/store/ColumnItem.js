/**
 * Created by LDQ on 2018/10/10
 */
class ColumnItem{
    constructor(item){
        this.item = item;
        this.evtStrategies = {
            "onClick": (text,evt)=>{
                return (
                    <div onClick={evt}>{text}</div>
                )
            }
        }
    }
    addEvt(evtName,callback){
        Object.assign({},{render:()=>{
                this.evtStrategies[evtName](text,callback);
            }},this.item)
    }
}
module.exports = ColumnItem;