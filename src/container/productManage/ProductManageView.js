import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';


@observer class ProductManageView extends Component{
    render(){
        return (
            <div>
                分类管理
            </div>
        )
    }
}



module.exports = ProductManageView;