import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';


@observer class StockProductView extends Component{
    render(){
        return (
            <div>
                分类管理
            </div>
        )
    }
}



module.exports = StockProductView;