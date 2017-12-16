/**
 * Created by LDQ on 2017/12/16
 */
import React, {Component} from 'react';
class OrderView extends Component{
    componentWillMount(){
        console.log("i'm order");
    }
    render(){
        return (
            <div>
                i'm order
            </div>
        )
    }
}
module.exports = OrderView;