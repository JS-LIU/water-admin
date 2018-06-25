import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';

@observer class ProductManageQueryView extends Component{
    render(){
        return (
            <div>
                商品查询
            </div>
        )
    }
}


module.exports = ProductManageQueryView;