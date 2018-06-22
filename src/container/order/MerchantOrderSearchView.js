/**
 * Created by LDQ on 2018/6/20
 */
import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';


@observer class MerchantOrderSearchView extends Component{
    render(){
        return (
            <div>
                商家订单查询
            </div>
        )
    }
}

module.exports = MerchantOrderSearchView
