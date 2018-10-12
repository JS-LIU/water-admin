/**
 * Created by LDQ on 2018/10/11
 */

import ColumnItem from './ColumnItem';
class BossTableColumnItem extends ColumnItem{
    constructor(item){
        super(item);
        // this.item.
    }
    addOnClick(text,record){
        let item = this.item;
        item.addEvt("onClick",()=>{
            this.setState({
                style:{background:"#000",color:"#FFF"}
            })
            // let render = this.createRender();
            // Object.assign({},{render:(text,record)=>{return (
            //
            //     )},item})
        });
    }
    createRender(evtName,evt){
        let render = {
            render:()=>{
                return (
                    <div evtName={evt}></div>
                )
            }
        }
    }
}
module.exports = BossTableColumnItem;