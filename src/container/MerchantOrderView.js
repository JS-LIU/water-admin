/**
 * Created by LDQ on 2018/1/9
 */


import React, {Component} from 'react';
import OrderView from './OrderView';

class MerchantOrderView extends Component{
    render(){
        return(
            <OrderView orderSrc="merchantSrc" />
        )
    }
}
module.exports = MerchantOrderView;